-- RNM ESPORTS Supabase setup
-- Run this once in Supabase SQL Editor.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.video_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  full_name text not null,
  pubg_id text,
  device text,
  contact text,
  experience text,
  video_path text not null,
  image_path text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  approved_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.video_submissions enable row level security;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

drop policy if exists "profiles read own" on public.profiles;
create policy "profiles read own"
on public.profiles for select
to authenticated
using (id = auth.uid() or public.is_admin());

drop policy if exists "admins update profiles" on public.profiles;
create policy "admins update profiles"
on public.profiles for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "users insert own pending videos" on public.video_submissions;
create policy "users insert own pending videos"
on public.video_submissions for insert
to authenticated
with check (user_id = auth.uid() and status = 'pending');

drop policy if exists "users read own videos" on public.video_submissions;
create policy "users read own videos"
on public.video_submissions for select
to authenticated
using (user_id = auth.uid() or public.is_admin() or status = 'approved');

drop policy if exists "public read approved videos" on public.video_submissions;
create policy "public read approved videos"
on public.video_submissions for select
to anon
using (status = 'approved');

drop policy if exists "admins update videos" on public.video_submissions;
create policy "admins update videos"
on public.video_submissions for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "admins delete videos" on public.video_submissions;
create policy "admins delete videos"
on public.video_submissions for delete
to authenticated
using (public.is_admin());

insert into storage.buckets (id, name, public)
values ('rnm-videos', 'rnm-videos', true)
on conflict (id) do update set public = true;

drop policy if exists "authenticated users upload rnm files" on storage.objects;
create policy "authenticated users upload rnm files"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'rnm-videos'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "public can view rnm videos" on storage.objects;
create policy "public can view rnm videos"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'rnm-videos');

drop policy if exists "admins delete rnm files" on storage.objects;
create policy "admins delete rnm files"
on storage.objects for delete
to authenticated
using (bucket_id = 'rnm-videos' and public.is_admin());

-- After your first admin signs up, run this with their email:
-- update public.profiles set role = 'admin' where email = 'YOUR_ADMIN_EMAIL@example.com';
