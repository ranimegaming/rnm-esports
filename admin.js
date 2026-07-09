const loginCard = document.getElementById('admin-login-card');
const loginForm = document.getElementById('admin-login-form');
const loginStatus = document.getElementById('admin-login-status');
const dashboard = document.getElementById('admin-dashboard');
const list = document.getElementById('admin-video-list');
const refreshBtn = document.getElementById('refresh-videos');
const logoutBtn = document.getElementById('admin-logout');

function setStatus(message, ok = false) {
  loginStatus.textContent = message;
  loginStatus.classList.toggle('ok', ok);
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[char]));
}

async function requireAdmin() {
  if (window.RNMVideoApp.missingConfig) {
    setStatus('Supabase is not configured yet. Add url and anonKey in config.js.');
    return false;
  }
  const { user, profile } = await window.RNMVideoApp.currentProfile();
  const isAdmin = Boolean(user && profile?.role === 'admin');
  loginCard.hidden = isAdmin;
  dashboard.hidden = !isAdmin;
  if (user && !isAdmin) setStatus('This account is not admin.');
  if (isAdmin) await loadPendingVideos();
  return isAdmin;
}

async function loadPendingVideos() {
  const client = await window.RNMVideoApp.getClient();
  list.innerHTML = '<article class="video-empty">Loading pending videos...</article>';
  const { data, error } = await client
    .from(window.RNMVideoApp.config.table || 'video_submissions')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: true });

  if (error) {
    list.innerHTML = `<article class="video-empty">${escapeHtml(error.message)}</article>`;
    return;
  }
  if (!data?.length) {
    list.innerHTML = '<article class="video-empty">No pending videos right now.</article>';
    return;
  }

  list.innerHTML = data.map(item => {
    const videoUrl = window.RNMVideoApp.publicUrl(client, item.video_path);
    const imageUrl = window.RNMVideoApp.publicUrl(client, item.image_path);
    return `
      <article class="admin-video-card" data-id="${item.id}">
        <video src="${videoUrl}" controls playsinline preload="metadata"></video>
        <div class="submission-info">
          <h3>${escapeHtml(item.full_name || 'No name')}</h3>
          <p><b>PUBG ID:</b> ${escapeHtml(item.pubg_id || '-')}</p>
          <p><b>Device:</b> ${escapeHtml(item.device || '-')}</p>
          <p><b>Contact:</b> ${escapeHtml(item.contact || '-')}</p>
          <p>${escapeHtml(item.experience || '')}</p>
          ${imageUrl ? `<a class="proof-link" href="${imageUrl}" target="_blank" rel="noreferrer">View PUBG ID photo ↗</a>` : ''}
          <div class="admin-card-actions">
            <button type="button" data-action="approve">Approve</button>
            <button type="button" data-action="reject">Reject</button>
            <button type="button" data-action="delete">Delete</button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

async function updateSubmission(id, action) {
  const client = await window.RNMVideoApp.getClient();
  if (action === 'delete') {
    const current = await client
      .from(window.RNMVideoApp.config.table || 'video_submissions')
      .select('video_path,image_path')
      .eq('id', id)
      .maybeSingle();
    if (current.error) throw current.error;
    const paths = [current.data?.video_path, current.data?.image_path].filter(Boolean);
    if (paths.length) {
      const removed = await client.storage
        .from(window.RNMVideoApp.config.videoBucket || 'rnm-videos')
        .remove(paths);
      if (removed.error) throw removed.error;
    }
    const deleted = await client
      .from(window.RNMVideoApp.config.table || 'video_submissions')
      .delete()
      .eq('id', id);
    if (deleted.error) throw deleted.error;
    return;
  }

  const nextStatus = action === 'approve' ? 'approved' : 'rejected';
  const update = await client
    .from(window.RNMVideoApp.config.table || 'video_submissions')
    .update({
      status: nextStatus,
      approved_at: action === 'approve' ? new Date().toISOString() : null
    })
    .eq('id', id);
  if (update.error) throw update.error;
}

loginForm.addEventListener('submit', async event => {
  event.preventDefault();
  try {
    const client = await window.RNMVideoApp.getClient();
    const form = new FormData(loginForm);
    const { error } = await client.auth.signInWithPassword({
      email: form.get('email'),
      password: form.get('password')
    });
    if (error) throw error;
    setStatus('Logged in.', true);
    await requireAdmin();
  } catch (error) {
    setStatus(error.message);
  }
});

list.addEventListener('click', async event => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const card = button.closest('[data-id]');
  button.disabled = true;
  try {
    await updateSubmission(card.dataset.id, button.dataset.action);
    await loadPendingVideos();
  } catch (error) {
    alert(error.message);
    button.disabled = false;
  }
});

refreshBtn.addEventListener('click', loadPendingVideos);
logoutBtn.addEventListener('click', async () => {
  const client = await window.RNMVideoApp.getClient();
  await client.auth.signOut();
  dashboard.hidden = true;
  loginCard.hidden = false;
});

requireAdmin();
