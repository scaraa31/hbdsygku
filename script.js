/* ============================================
   ROMANTIC BIRTHDAY WEBSITE — script.js
   ============================================ */

/* ─── State ─────────────────────────────────── */
let currentSlide = 1;
let typingDone = false;
let gameRunning = false;
let gameScore = 0;
let gameInterval = null;
let heartInterval = null;

/* ─── Slide Navigation ──────────────────────── */
function goTo(n) {
    const music = document.getElementById('bg-music');
  if (music && music.paused) music.play();
  const current = document.getElementById(`slide-${currentSlide}`);
  const next    = document.getElementById(`slide-${n}`);
  if (!next || n === currentSlide) return;

  current.classList.add('exit');
  setTimeout(() => {
    current.classList.remove('active', 'exit');
  }, 600);

  next.classList.add('active');
  currentSlide = n;
  updateDots();

  // Trigger per-slide logic
  if (n === 2 && !typingDone) startTyping();
  if (n === 4) resetGame();
  if (n === 5) resetCake();
}

function updateDots() {
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i + 1 === currentSlide);
  });
}

/* ─── Background Hearts ─────────────────────── */
(function spawnBgHearts() {
  const container = document.getElementById('bg-hearts');
  const hearts = ['💗', '💕', '💖', '💓', '🌸', '✿', '❀'];
  function spawn() {
    const el = document.createElement('div');
    el.className = 'bg-heart';
    el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    el.style.left     = Math.random() * 100 + 'vw';
    el.style.fontSize = (0.8 + Math.random() * 1.4) + 'rem';
    const dur = 8 + Math.random() * 10;
    el.style.animationDuration = dur + 's';
    el.style.animationDelay   = Math.random() * 4 + 's';
    container.appendChild(el);
    setTimeout(() => el.remove(), (dur + 4) * 1000);
  }
  for (let i = 0; i < 12; i++) setTimeout(spawn, i * 400);
  setInterval(spawn, 900);
})();

/* ─── Sparkles ──────────────────────────────── */
(function spawnSparkles() {
  const container = document.getElementById('bg-sparkles');
  function spawn() {
    const el = document.createElement('div');
    el.className = 'sparkle';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top  = Math.random() * 100 + 'vh';
    const size = 3 + Math.random() * 6;
    el.style.width  = size + 'px';
    el.style.height = size + 'px';
    const dur = 2 + Math.random() * 3;
    el.style.animationDuration = dur + 's';
    el.style.animationDelay   = Math.random() * 2 + 's';
    container.appendChild(el);
    setTimeout(() => el.remove(), (dur + 2) * 1000);
  }
  for (let i = 0; i < 20; i++) setTimeout(spawn, i * 250);
  setInterval(spawn, 600);
})();

/* ─── Section 2: Typing Animation ──────────── */
const message = [
  "Selamat ulang tahun, sayang. 💗",
  "\n\nJujur nih ya,",
  " kamu tuh hal yang ga pernah aku rencanain.",
  " Tapi justru karena kamu, semuanya kerasa lebih indah.",
  "\n\nAda yang bilang, orang yang tepat datang",
  " di waktu yang ga pernah kamu duga.",
  " Dan aku rasa, itu kamu.",
  "\n\nKamu ga sempurna, aku juga ngga.",
  " Tapi entah kenapa, kita selalu nemu cara",
  " untuk tetap saling ada.",
  " Dan itu hal yang paling aku syukuri.",
  "\n\nHari ini bukan cuma soal ulang tahun.",
  " Ini soal betapa beruntungnya aku,",
  " bisa kenal, dekat, dan sayang sama kamu.",
  "\n\nSelamat ulang tahun, sayangku.",
  " Semoga tahun ini jadi yang paling indah. ❤️",
  "\n\nI love you, more than you know. 🌸"
].join('');
function startTyping() {
  const el = document.getElementById('typing-text');
  el.textContent = '';
  let i = 0;
  const speed = 28;
  function type() {
    if (i < message.length) {
      if (message[i] === '\n') {
        el.appendChild(document.createElement('br'));
        if (message[i + 1] === '\n') {
          el.appendChild(document.createElement('br'));
          i++;
        }
      } else {
        el.insertAdjacentText('beforeend', message[i]);
      }
      i++;
      setTimeout(type, speed);
    } else {
      typingDone = true;
      document.querySelector('.typing-cursor').style.display = 'none';
    }
  }
  type();
}

/* ─── Section 3: Lightbox ───────────────────── */
function openLightbox(src, caption) {
  const lb = document.getElementById('lightbox');
  document.getElementById('lightbox-img').src     = src;
  document.getElementById('lightbox-caption').textContent = caption;
  lb.classList.add('open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

/* ─── Section 4: Heart Catch Game ──────────── */
const HEARTS_EMOJIS = ['💗', '💕', '💖', '💓', '❤️', '🩷'];
const GOAL = 15;

function resetGame() {
  gameScore = 0;
  gameRunning = false;
  document.getElementById('score').textContent = '0';
  document.getElementById('start-btn').style.display = 'inline-block';
  document.getElementById('unlock-btn').style.display = 'none';
  document.getElementById('game-msg').classList.add('hidden');
  clearInterval(gameInterval);
  clearInterval(heartInterval);
  document.querySelectorAll('.falling-heart').forEach(h => h.remove());
}

function startGame() {
  document.getElementById('start-btn').style.display = 'none';
  gameRunning = true;
  heartInterval = setInterval(spawnHeart, 900);
  // safety timeout — 45s
  setTimeout(() => {
    if (gameRunning) endGame();
  }, 45000);
}

function spawnHeart() {
  if (!gameRunning) return;
  const area = document.getElementById('game-area');
  const el = document.createElement('div');
  el.className = 'falling-heart';
  el.textContent = HEARTS_EMOJIS[Math.floor(Math.random() * HEARTS_EMOJIS.length)];
  const xMax = area.clientWidth - 50;
  el.style.left = (10 + Math.random() * xMax) + 'px';
  el.style.fontSize = (1.6 + Math.random() * 1.2) + 'rem';
  const dur = 2.5 + Math.random() * 2;
  el.style.animationDuration = dur + 's';
  el.addEventListener('click', () => catchHeart(el));
  area.appendChild(el);
  setTimeout(() => { if (el.parentNode) el.remove(); }, dur * 1000 + 200);
}

function catchHeart(el) {
  if (!gameRunning) return;
  el.classList.add('heart-pop');
  el.removeEventListener('click', () => catchHeart(el));
  setTimeout(() => el.remove(), 350);
  gameScore++;
  document.getElementById('score').textContent = gameScore;
  if (gameScore >= GOAL) endGame();
}

function endGame() {
  gameRunning = false;
  clearInterval(heartInterval);
  document.querySelectorAll('.falling-heart').forEach(h => h.remove());
  document.getElementById('game-msg').classList.remove('hidden');
  setTimeout(() => {
    document.getElementById('unlock-btn').style.display = 'inline-block';
  }, 1200);
}

/* ─── Section 5: Birthday Cake ──────────────── */
function resetCake() {
  document.querySelectorAll('.flame').forEach(f => f.classList.remove('out'));
  document.getElementById('wish-text').classList.add('hidden');
  document.getElementById('blow-btn').classList.remove('hidden');
  document.getElementById('final-btn').classList.add('hidden');
}

function blowCandles() {
  const flames = document.querySelectorAll('.flame');
  flames.forEach((f, i) => {
    setTimeout(() => f.classList.add('out'), i * 200);
  });
  document.getElementById('blow-btn').classList.add('hidden');
  setTimeout(() => {
    document.getElementById('wish-text').classList.remove('hidden');
    launchConfetti();
  }, 1200);
  setTimeout(() => {
    document.getElementById('final-btn').classList.remove('hidden');
  }, 2500);
}

/* ─── Confetti ──────────────────────────────── */
const CONFETTI_COLORS = [
  '#e75480', '#f48fb1', '#f8bbd0', '#ffd6e7',
  '#ff9ecc', '#ff6eb4', '#ffffff', '#fff0f5',
  '#f7c5d0', '#c77096'
];

function launchConfetti() {
  const container = document.getElementById('confetti-container');
  for (let i = 0; i < 120; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      el.style.left  = Math.random() * 100 + 'vw';
      el.style.top   = '-20px';
      el.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      el.style.width  = (6 + Math.random() * 10) + 'px';
      el.style.height = (8 + Math.random() * 14) + 'px';
      el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      el.style.transform = `rotate(${Math.random() * 360}deg)`;
      const dur = 2 + Math.random() * 2.5;
      el.style.animationDuration = dur + 's';
      container.appendChild(el);
      setTimeout(() => el.remove(), dur * 1000 + 200);
    }, i * 25);
  }
}

/* ─── Section 6: Heart Explosion ────────────── */
function loveExplosion() {
  const btn = document.getElementById('love-btn');
  const rect = btn.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const emoji = ['💗', '💕', '💖', '💓', '❤️', '🌸', '✨', '💘'];

  for (let i = 0; i < 35; i++) {
    const el = document.createElement('div');
    el.className = 'explosion-heart';
    el.textContent = emoji[Math.floor(Math.random() * emoji.length)];
    el.style.left = cx + 'px';
    el.style.top  = cy + 'px';
    const angle = (Math.random() * Math.PI * 2);
    const dist  = 80 + Math.random() * 260;
    el.style.setProperty('--tx', (Math.cos(angle) * dist) + 'px');
    el.style.setProperty('--ty', (Math.sin(angle) * dist) + 'px');
    el.style.setProperty('--rot', (Math.random() * 360 - 180) + 'deg');
    el.style.fontSize = (1.2 + Math.random() * 1.8) + 'rem';
    el.style.animationDuration = (0.9 + Math.random() * 0.6) + 's';
    el.style.animationDelay    = (Math.random() * 0.3) + 's';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2000);
  }

  launchConfetti();

  // Pulse the button
  btn.textContent = '💗 Forever Yours 💗';
  btn.style.animation = 'none';
  setTimeout(() => btn.style.animation = '', 50);
}

/* ─── Keyboard Navigation ───────────────────── */
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' && currentSlide < 6) goTo(currentSlide + 1);
  if (e.key === 'ArrowLeft'  && currentSlide > 1) goTo(currentSlide - 1);
});

/* ─── Touch Swipe Navigation ────────────────── */
let touchStartX = 0;
document.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
document.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) < 50) return;
  if (dx < 0 && currentSlide < 6) goTo(currentSlide + 1);
  if (dx > 0 && currentSlide > 1) goTo(currentSlide - 1);
}, { passive: true });
