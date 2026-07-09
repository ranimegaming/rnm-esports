# RNM ESPORTS

Premium esports clan website built with HTML, CSS, JavaScript, and Supabase.

## Run locally

Open `index.html` directly, or run any static file server in this folder.

## Deploy

This folder can be deployed as-is to Vercel or Cloudflare Pages. No build command is required; use the project root as the output directory.

Vercel routes:

- `/` public website
- `/upload` user video upload page
- `/admin` admin dashboard

## Live notification

Open `config.js` and set `liveStreamer` to `"ranimegaming"` or `"darwish.hajj"` when that person starts streaming. The red live banner and Watch Live button automatically use the selected TikTok channel. Set `liveStreamer` back to `""` when nobody is live.

For fully automatic Kick/TikTok/YouTube detection, connect `config.js` to the platform API through a serverless function.

## Supabase setup

1. Create a Supabase project.
2. Open Supabase SQL Editor and run `supabase-schema.sql`.
3. In Supabase, copy your Project URL and anon public key.
4. Paste them into `config.js`:

```js
supabase: {
  url: "YOUR_SUPABASE_PROJECT_URL",
  anonKey: "YOUR_SUPABASE_ANON_KEY",
  videoBucket: "rnm-videos",
  table: "video_submissions"
}
```

5. Create your admin account from `/upload` or Supabase Auth.
6. Run this in Supabase SQL Editor, replacing the email:

```sql
update public.profiles
set role = 'admin'
where email = 'YOUR_ADMIN_EMAIL@example.com';
```

## Upload and admin flow

- Users login/signup and upload at `/upload`.
- Uploaded videos are stored in Supabase Storage.
- Every upload starts as `pending`.
- Admins login at `/admin`.
- Admins can preview, approve, reject, or delete videos.
- Approved videos appear automatically on the public website.
