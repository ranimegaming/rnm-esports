const navWrap = document.querySelector('.nav-wrap');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const siteConfig = window.RNM_CONFIG || {};
const languageToggle = document.getElementById('language-toggle');

const arabicTranslations = {
  'Official Ranime Gaming Clan': 'عشيرة RANIME GAMING الرسمية',
  '01 / ABOUT': '01 / من نحن',
  '02 / CODE': '02 / مبادئنا',
  '03 / LEADERS': '03 / القادة',
  '05 / MEDIA': '05 / المقاطع',
  '06 / RECRUITMENT': '06 / الانضمام',
  'We are more than a team. We are one family building prestige in PUBG through strength, loyalty, respect, and one vision.': 'لسنا مجرد فريق، نحن عائلة تصنع الهيبة داخل ساحة PUBG. قوة، ولاء، احترام، وتنظيم تحت راية واحدة.',
  'Join the clan': 'انضم إلى العشيرة',
  'Watch live': 'شاهد البث',
  'Members': 'عضو',
  'Identity': 'هوية',
  'Heart': 'قلب واحد',
  'Scroll to explore': 'مرّر للاستكشاف',
  'COMPETE': 'نافس',
  'CREATE': 'اصنع',
  'DOMINATE': 'سيطر',
  'ONE CLAN.': 'عشيرة واحدة.',
  'ZERO LIMITS.': 'بلا حدود.',
  'RNM is more than a tag. It’s a promise to show up, level up, and bring the whole squad with you.': 'RNM أكثر من مجرد اسم؛ إنها وعد بالحضور والتطور ودعم الفريق بأكمله.',
  'From ranked ladders to tournament finals, Ranime Gaming Clan brings together serious competitors, fearless creators, and the loudest community in the lobby.': 'من المباريات المصنّفة إلى نهائيات البطولات، تجمع RNM منافسين محترفين وصنّاع محتوى جريئين ومجتمعًا قويًا.',
  'Compete with purpose': 'قوة داخل اللعب',
  'Respect the squad': 'تنظيم وهيبة',
  'Build the legacy': 'عائلة واحدة',
  'CLAN RULES': 'قوانين العشيرة',
  'Great teams run on trust. These are the standards behind the RNM tag.': 'الفرق العظيمة تُبنى على الثقة. هذه هي معايير اسم RNM.',
  'Respect first': 'الاحترام',
  'No toxicity, hate, or harassment. Competitive energy stays competitive.': 'الاحترام أساسنا، ونرفض الإساءة والكراهية والتخريب بين الأعضاء.',
  'Stay active': 'التعاون',
  'Communicate, show up for the squad, and keep your status updated.': 'نتعاون كفريق واحد، نتواصل دائمًا، ونساند بعضنا في كل مواجهة.',
  'Play fair': 'الانضباط',
  'Zero tolerance for cheats, exploits, or anything that damages our name.': 'نظام واضح والتزام كامل، ولا نقبل الغش أو أي تصرف يسيء لاسم الكلان.',
  'Rep the tag': 'الولاء',
  'Wear RNM with pride and represent the clan professionally everywhere.': 'نحمل اسم RNM بفخر ونمثّل الكلان باحتراف وقوة في كل مكان.',
  'MEET THE LEADERS': 'تعرّف على القادة',
  'Different roles. One objective. The core team leading RNM into every battle.': 'أدوار مختلفة وهدف واحد. الفريق الأساسي الذي يقود RNM في كل معركة.',
  'Leader / Founder': 'القائد / المؤسس',
  'INSIDE RNM': 'داخل RNM',
  'Clips, victories, and moments from the clan. The grind looks good from here.': 'لقطات وانتصارات ولحظات من العشيرة.',
  'SCRIM مع CAST عقرب': 'سكرم مع CAST عقرب',
  'WATCH ON TIKTOK': 'شاهد على تيك توك',
  'READY TO': 'هل أنت مستعد',
  'RUN WITH US?': 'للانضمام إلينا؟',
  'JOIN': 'شروط',
  'REQUIREMENTS': 'القبول',
  'Think you have what it takes? Tell us how you play. We review every application and contact the strongest fits.': 'هل لديك ما يلزم؟ أخبرنا عن أسلوب لعبك. نراجع كل طلب ونتواصل مع الأنسب.',
  'Girls must be 18+ · Boys must be 20+': 'البنات 18+ · الشباب 20+',
  'Acceptance Requirements': 'شروط القبول',
  'Respect the administration and all members.': 'احترام الإدارة وجميع الأعضاء.',
  'Have good performance in PUBG Mobile.': 'امتلاك أداء جيد في PUBG Mobile.',
  'Upload a clear video that proves your skill level.': 'رفع فيديو واضح يثبت مستواك.',
  'Commit to teamwork and do not disrupt the clan.': 'الالتزام بروح الفريق وعدم التخريب.',
  'Stay active in clan training sessions and scrims.': 'التفاعل مع تدريبات وسكريمات الكلان.',
  'Full name': 'الاسم الكامل',
  'PUBG ID': 'معرّف PUBG',
  'Device': 'الجهاز',
  'SELECT DEVICE': 'اختر الجهاز',
  'Phone': 'هاتف',
  'Tablet / iPad': 'تابلت / آيباد',
  'Discord / WhatsApp': 'ديسكورد / واتساب',
  'UPLOAD GAMEPLAY VIDEO': 'ارفع فيديو اللعب',
  'UPLOAD PUBG ID PHOTO': 'ارفع صورة معرّف PUBG',
  'Choose video': 'اختر فيديو',
  'Choose photo': 'اختر صورة',
  'How did you hear about us?': 'كيف عرفت عنا؟',
  'Send application': 'إرسال الطلب',
  'TIKTOK': 'تيك توك',
  'YOUTUBE': 'يوتيوب',
  'TELEGRAM': 'تلغرام',
  'BACK TO TOP ↑': 'العودة للأعلى ↑',
  'Join RNM': 'انضم إلى RNM',
  'RANIME IS LIVE NOW': 'رانيمي مباشر الآن',
  'Join the stream and support RNM': 'انضم إلى البث وادعم RNM',
  'WATCH NOW': 'شاهد الآن'
};
const arabicPlaceholders = {
  'YOUR NAME': 'اكتب اسمك',
  'YOUR PLAYER ID': 'اكتب معرّف اللاعب',
  'HOW CAN WE CONTACT YOU?': 'كيف يمكننا التواصل معك؟',
  'TIKTOK, DISCORD, FRIEND, LIVE STREAM...': 'تيك توك، ديسكورد، صديق، بث مباشر...'
};
const originalText = new Map();
const translatableNodes = [];
document.querySelectorAll('body *:not(script):not(style)').forEach(element => {
  element.childNodes.forEach(node => {
    if (node.nodeType === 3 && node.textContent.trim()) {
      originalText.set(node, node.textContent);
      translatableNodes.push(node);
    }
  });
});
document.querySelectorAll('[placeholder]').forEach(input => input.dataset.originalPlaceholder = input.placeholder);

function setLanguage(language) {
  const arabic = language === 'ar';
  document.documentElement.lang = arabic ? 'ar' : 'en';
  document.documentElement.dir = arabic ? 'rtl' : 'ltr';
  document.documentElement.classList.toggle('is-arabic', arabic);
  translatableNodes.forEach(node => {
    const source = originalText.get(node);
    const trimmed = source.trim();
    const replacement = arabic ? (arabicTranslations[trimmed] || trimmed) : trimmed;
    const leading = source.match(/^\s*/)?.[0] || '';
    const trailing = source.match(/\s*$/)?.[0] || '';
    node.textContent = `${leading}${replacement}${trailing}`;
  });
  document.querySelectorAll('[placeholder]').forEach(input => {
    const source = input.dataset.originalPlaceholder;
    input.placeholder = arabic ? (arabicPlaceholders[source] || source) : source;
  });
}
const requestedLanguage = new URLSearchParams(location.search).get('lang');
setLanguage(requestedLanguage === 'ar' ? 'ar' : 'en');
document.querySelectorAll('#language-toggle [data-lang]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const language = link.dataset.lang;
    setLanguage(language);
    const url = new URL(location.href);
    url.searchParams.set('lang', language);
    history.replaceState(null, '', url);
  });
});

const liveAlert = document.getElementById('live-alert');
const liveAlertLink = document.getElementById('live-alert-link');
const watchLive = document.getElementById('watch-live');
const watchLabel = watchLive.querySelector('.watch-label');
const activeStreamer = siteConfig.streamers?.[siteConfig.liveStreamer];
const defaultStreamer = siteConfig.streamers?.ranimegaming;
const streamUrl = activeStreamer?.url || defaultStreamer?.url || '#';
watchLive.href = streamUrl;
liveAlertLink.href = streamUrl;

if (activeStreamer) {
  liveAlert.hidden = false;
  document.body.classList.add('has-live-alert');
  watchLive.classList.add('is-live');
  watchLabel.textContent = `${activeStreamer.name} IS LIVE`;
  liveAlert.querySelector('.live-alert-copy b').textContent = `${activeStreamer.name} IS LIVE NOW`;
} else {
  watchLabel.textContent = 'Watch live';
}

document.getElementById('close-live-alert').addEventListener('click', () => {
  liveAlert.hidden = true;
  document.body.classList.remove('has-live-alert');
});

window.addEventListener('scroll', () => navWrap.classList.toggle('scrolled', scrollY > 30), { passive: true });
menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
});
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}));

window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  document.documentElement.style.setProperty('--scroll-progress', `${max ? (scrollY / max) * 100 : 0}%`);
}, { passive: true });

const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), index * 70);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    const start = performance.now();
    const tick = now => {
      const progress = Math.min((now - start) / 1200, 1);
      el.textContent = Math.floor(target * (1 - Math.pow(1 - progress, 3))) + (target === 94 ? '' : '+');
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
}, { threshold: 1 });
document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

document.querySelectorAll('.upload-box input[type="file"]').forEach(input => {
  input.addEventListener('change', () => {
    const box = input.closest('.upload-box');
    const name = box.querySelector('.file-name');
    const file = input.files[0];
    box.classList.toggle('has-file', Boolean(file));
    name.textContent = file ? file.name : (input.accept.includes('video') ? 'Choose video' : 'Choose photo');
  });
});

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', e => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
}, { passive: true });

const canHover = matchMedia('(hover:hover) and (pointer:fine)').matches;
if (canHover) {
  document.querySelectorAll('.rule-card, .player-card, .join-form').forEach(card => {
    card.addEventListener('pointermove', e => {
      const box = card.getBoundingClientRect();
      const x = (e.clientX - box.left) / box.width;
      const y = (e.clientY - box.top) / box.height;
      card.style.setProperty('--mx', `${x * 100}%`);
      card.style.setProperty('--my', `${y * 100}%`);
      card.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 4}deg) rotateY(${(x - 0.5) * 5}deg) translateY(-4px)`;
    });
    card.addEventListener('pointerleave', () => card.style.transform = '');
  });

  const emblem = document.querySelector('.hero-emblem');
  document.querySelector('.hero').addEventListener('pointermove', e => {
    const x = e.clientX / innerWidth - .5;
    const y = e.clientY / innerHeight - .5;
    emblem.style.transform = `perspective(900px) rotateX(${-y * 9}deg) rotateY(${x * 12}deg)`;
  });
}

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() {
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  particles = Array.from({ length: Math.min(65, Math.floor(innerWidth / 18)) }, () => ({
    x: Math.random() * innerWidth, y: Math.random() * innerHeight,
    vx: (Math.random() - .5) * .18, vy: -Math.random() * .22 - .03,
    r: Math.random() * 1.3 + .3, red: Math.random() > .82
  }));
}
function drawParticles() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.y < -5) p.y = innerHeight + 5;
    if (p.x < -5) p.x = innerWidth + 5;
    if (p.x > innerWidth + 5) p.x = -5;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.red ? 'rgba(255,39,75,.55)' : 'rgba(126,205,255,.38)';
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}
resizeCanvas();
drawParticles();
window.addEventListener('resize', resizeCanvas);

if (window.RNMVideoApp) {
  window.RNMVideoApp.insertApprovedSection();
  window.RNMVideoApp.renderApprovedVideos();

  const joinForm = document.getElementById('join-form');
  joinForm.addEventListener('submit', async event => {
    event.preventDefault();
    event.stopImmediatePropagation();
    const form = event.currentTarget;
    const button = form.querySelector('button');
    const status = form.querySelector('.form-status');
    button.disabled = true;
    button.textContent = 'TRANSMITTING...';
    status.textContent = '';
    try {
      if (window.RNMVideoApp.missingConfig) {
        throw new Error('SUPABASE IS NOT CONNECTED YET. ADD URL AND ANON KEY IN CONFIG.JS.');
      }
      await window.RNMVideoApp.uploadApplication(form);
      status.textContent = 'APPLICATION SENT — VIDEO IS PENDING ADMIN APPROVAL.';
      button.innerHTML = 'Application sent <span>✓</span>';
      form.reset();
      form.querySelectorAll('.upload-box').forEach(box => box.classList.remove('has-file'));
      form.querySelectorAll('.file-name').forEach((name, index) => {
        name.textContent = index === 0 ? 'Choose video' : 'Choose photo';
      });
    } catch (error) {
      status.textContent = error.message;
      button.innerHTML = 'Send application <span>↗</span>';
    } finally {
      setTimeout(() => {
        button.disabled = false;
        if (!button.textContent.toLowerCase().includes('send')) {
          button.innerHTML = 'Send application <span>↗</span>';
        }
      }, 2500);
    }
  }, true);
}

document.getElementById('join-form').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.currentTarget;
  const button = form.querySelector('button');
  const status = form.querySelector('.form-status');
  button.disabled = true;
  button.textContent = 'TRANSMITTING...';
  setTimeout(() => {
    status.textContent = 'APPLICATION READY — CONNECT A FORM SERVICE TO RECEIVE THE FILES.';
    button.innerHTML = 'Application sent <span>✓</span>';
    form.reset();
    setTimeout(() => { button.disabled = false; button.innerHTML = 'Send application <span>↗</span>'; }, 3500);
  }, 900);
});
