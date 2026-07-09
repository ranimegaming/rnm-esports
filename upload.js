const authCard = document.getElementById('user-auth-card');
const authForm = document.getElementById('user-auth-form');
const signupBtn = document.getElementById('signup-btn');
const authStatus = document.getElementById('user-auth-status');
const uploadForm = document.getElementById('upload-form');
const userEmail = document.getElementById('upload-user-email');
const logoutBtn = document.getElementById('upload-logout');

function setStatus(node, message, ok = false) {
  node.textContent = message;
  node.classList.toggle('ok', ok);
}

async function refreshSession() {
  if (window.RNMVideoApp.missingConfig) {
    setStatus(authStatus, 'Supabase is not configured yet. Add url and anonKey in config.js.');
    return;
  }
  const { user } = await window.RNMVideoApp.currentProfile();
  authCard.hidden = Boolean(user);
  uploadForm.hidden = !user;
  if (user) userEmail.textContent = user.email;
}

authForm.addEventListener('submit', async event => {
  event.preventDefault();
  const client = await window.RNMVideoApp.getClient();
  const form = new FormData(authForm);
  const { error } = await client.auth.signInWithPassword({
    email: form.get('email'),
    password: form.get('password')
  });
  if (error) return setStatus(authStatus, error.message);
  setStatus(authStatus, 'Logged in.', true);
  await refreshSession();
});

signupBtn.addEventListener('click', async () => {
  try {
    const client = await window.RNMVideoApp.getClient();
    const form = new FormData(authForm);
    const { error } = await client.auth.signUp({
      email: form.get('email'),
      password: form.get('password')
    });
    if (error) throw error;
    setStatus(authStatus, 'Account created. If email confirmation is enabled, confirm your email then login.', true);
  } catch (error) {
    setStatus(authStatus, error.message);
  }
});

logoutBtn.addEventListener('click', async () => {
  const client = await window.RNMVideoApp.getClient();
  await client.auth.signOut();
  await refreshSession();
});

document.querySelectorAll('.upload-box input[type="file"]').forEach(input => {
  input.addEventListener('change', () => {
    const box = input.closest('.upload-box');
    const name = box.querySelector('.file-name');
    const file = input.files[0];
    box.classList.toggle('has-file', Boolean(file));
    name.textContent = file ? file.name : (input.accept.includes('video') ? 'Choose video' : 'Choose photo');
  });
});

uploadForm.addEventListener('submit', async event => {
  event.preventDefault();
  const button = uploadForm.querySelector('button[type="submit"]');
  const status = uploadForm.querySelector('.form-status');
  button.disabled = true;
  button.textContent = 'UPLOADING...';
  setStatus(status, '');
  try {
    await window.RNMVideoApp.uploadApplication(uploadForm);
    setStatus(status, 'Video uploaded. Status: pending admin approval.', true);
    uploadForm.reset();
    uploadForm.querySelectorAll('.upload-box').forEach(box => box.classList.remove('has-file'));
    uploadForm.querySelectorAll('.file-name').forEach((name, index) => {
      name.textContent = index === 0 ? 'Choose video' : 'Choose photo';
    });
  } catch (error) {
    setStatus(status, error.message);
  } finally {
    button.disabled = false;
    button.innerHTML = 'Submit for review <span>↗</span>';
  }
});

refreshSession();
