(() => {
  const config = window.RNM_CONFIG?.supabase || {};
  const missingConfig = !config.url || !config.anonKey;
  let clientPromise;

  function loadSupabaseSdk() {
    if (window.supabase) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-supabase-sdk]');
      if (existing) {
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      script.async = true;
      script.dataset.supabaseSdk = 'true';
      script.onload = resolve;
      script.onerror = () => reject(new Error('Supabase SDK could not load.'));
      document.head.appendChild(script);
    });
  }

  async function getClient() {
    if (missingConfig) throw new Error('Supabase is not configured yet. Add url and anonKey in config.js.');
    if (!clientPromise) {
      clientPromise = loadSupabaseSdk().then(() => window.supabase.createClient(config.url, config.anonKey));
    }
    return clientPromise;
  }

  function safeFileName(name) {
    return name.toLowerCase().replace(/[^a-z0-9.]+/g, '-').replace(/^-+|-+$/g, '');
  }

  function publicUrl(client, path) {
    if (!path) return '';
    const { data } = client.storage.from(config.videoBucket || 'rnm-videos').getPublicUrl(path);
    return data.publicUrl;
  }

  async function currentProfile() {
    const client = await getClient();
    const { data: authData, error: authError } = await client.auth.getUser();
    if (authError || !authData.user) return { user: null, profile: null };
    const { data: profile } = await client
      .from('profiles')
      .select('id,email,role')
      .eq('id', authData.user.id)
      .maybeSingle();
    return { user: authData.user, profile };
  }

  async function uploadApplication(form) {
    const client = await getClient();
    const { user } = await currentProfile();
    if (!user) throw new Error('Please login before uploading your video.');

    const data = new FormData(form);
    const video = data.get('gameplayVideo');
    const image = data.get('pubgIdImage');
    if (!video?.name) throw new Error('Gameplay video is required.');

    const basePath = `${user.id}/${Date.now()}`;
    const videoPath = `${basePath}-${safeFileName(video.name)}`;
    const imagePath = image?.name ? `${basePath}-pubg-id-${safeFileName(image.name)}` : null;

    const videoUpload = await client.storage
      .from(config.videoBucket || 'rnm-videos')
      .upload(videoPath, video, { cacheControl: '3600', upsert: false });
    if (videoUpload.error) throw videoUpload.error;

    if (imagePath) {
      const imageUpload = await client.storage
        .from(config.videoBucket || 'rnm-videos')
        .upload(imagePath, image, { cacheControl: '3600', upsert: false });
      if (imageUpload.error) throw imageUpload.error;
    }

    const insert = await client.from(config.table || 'video_submissions').insert({
      user_id: user.id,
      full_name: data.get('fullName') || '',
      pubg_id: data.get('pubgId') || '',
      device: data.get('device') || '',
      contact: data.get('contact') || '',
      experience: data.get('experience') || '',
      video_path: videoPath,
      image_path: imagePath,
      status: 'pending'
    });
    if (insert.error) throw insert.error;
  }

  async function renderApprovedVideos(targetId = 'approved-video-grid') {
    const target = document.getElementById(targetId);
    if (!target) return;
    if (missingConfig) {
      target.innerHTML = '<article class="video-empty">Supabase is not configured yet.</article>';
      return;
    }
    try {
      const client = await getClient();
      const { data, error } = await client
        .from(config.table || 'video_submissions')
        .select('id,full_name,pubg_id,device,video_path,created_at')
        .eq('status', 'approved')
        .order('approved_at', { ascending: false })
        .limit(12);
      if (error) throw error;
      target.innerHTML = data?.length ? data.map(item => `
        <article class="approved-card">
          <video src="${publicUrl(client, item.video_path)}" controls playsinline preload="metadata"></video>
          <div>
            <b>${item.full_name || 'RNM Applicant'}</b>
            <span>PUBG ID: ${item.pubg_id || '-'}</span>
            <small>${item.device || 'Player video'}</small>
          </div>
        </article>
      `).join('') : '<article class="video-empty">No approved videos yet.</article>';
    } catch (error) {
      target.innerHTML = `<article class="video-empty">${error.message}</article>`;
    }
  }

  function insertApprovedSection() {
    if (document.getElementById('approved-videos')) return;
    const gallery = document.getElementById('gallery');
    if (!gallery) return;
    gallery.insertAdjacentHTML('afterend', `
      <section class="section approved-videos" id="approved-videos">
        <div class="container">
          <div class="section-top reveal visible">
            <div><span class="section-index">06 / APPROVED VIDEOS</span><h2>APPROVED<br><em>CLIPS</em></h2></div>
            <p>Videos accepted by RNM admins appear here automatically after approval.</p>
          </div>
          <div class="video-grid" id="approved-video-grid">
            <article class="video-empty">Loading approved videos...</article>
          </div>
        </div>
      </section>
    `);
  }

  window.RNMVideoApp = {
    getClient,
    currentProfile,
    uploadApplication,
    renderApprovedVideos,
    insertApprovedSection,
    publicUrl,
    config,
    missingConfig
  };
})();
