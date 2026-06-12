/* ============================================================
   script.js — Tejaswini Madhav Gouda Portfolio
   ============================================================ */

/* ── NAV SCROLL ──────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 55);
}, { passive: true });

/* ── HAMBURGER MENU ──────────────────────────── */
const hamburger    = document.getElementById('hamburger');
const mobileOverlay = document.getElementById('mobileOverlay');
const closeBtn     = document.getElementById('closeBtn');

hamburger.addEventListener('click', () => mobileOverlay.classList.add('open'));
closeBtn.addEventListener('click',  () => mobileOverlay.classList.remove('open'));
function closeMobile() { mobileOverlay.classList.remove('open'); }

/* ── TYPEWRITER ──────────────────────────── */
const roles = [
  'Java Full Stack Developer',
  'Backend Engineer',
  'Web Developer',
  'Problem Solver',
  'CS Undergrad 2026'
];
let rIdx = 0, cIdx = 0, deleting = false;
const tw = document.getElementById('typewriter');

function type() {
  const word = roles[rIdx];
  if (!deleting) {
    tw.textContent = word.slice(0, ++cIdx);
    if (cIdx === word.length) { deleting = true; setTimeout(type, 2000); return; }
  } else {
    tw.textContent = word.slice(0, --cIdx);
    if (cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; }
  }
  setTimeout(type, deleting ? 48 : 78);
}
type();

/* ── PARTICLE CANVAS ──────────────────────────── */
const canvas = document.getElementById('canvas');
const ctx    = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', () => { resize(); spawnParticles(); });

function rand(a, b) { return Math.random() * (b - a) + a; }

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x     = rand(0, W);
    this.y     = rand(0, H);
    this.size  = rand(0.8, 2.1);
    this.vx    = rand(-0.14, 0.14);
    this.vy    = rand(-0.14, 0.14);
    this.alpha = rand(0.12, 0.5);
  }
  step() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W) this.vx *= -1;
    if (this.y < 0 || this.y > H) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,212,255,${this.alpha})`;
    ctx.fill();
  }
}

function spawnParticles() {
  const n = Math.floor((W * H) / 17000);
  particles = Array.from({ length: n }, () => new Particle());
}

function drawLines() {
  const max = 125;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d  = Math.hypot(dx, dy);
      if (d < max) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0,212,255,${(1 - d / max) * 0.11})`;
        ctx.lineWidth   = 0.7;
        ctx.stroke();
      }
    }
  }
}

function loop() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.step(); p.draw(); });
  drawLines();
  requestAnimationFrame(loop);
}
spawnParticles();
loop();

/* ── HERO MOUSE GLOW ──────────────────────────── */
const hero = document.getElementById('hero');
hero.addEventListener('mousemove', e => {
  hero.style.background = `
    radial-gradient(ellipse at ${e.clientX}px ${e.clientY}px, rgba(0,212,255,.09) 0%, transparent 50%),
    radial-gradient(ellipse at 60% 40%, rgba(0,212,255,.05) 0%, transparent 60%),
    #0A0F1E
  `;
});
hero.addEventListener('mouseleave', () => { hero.style.background = ''; });

/* ── SCROLL REVEAL ──────────────────────────── */
const reveals  = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 90);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

/* ── ACTIVE NAV LINK ──────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let active = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 180) active = s.id; });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${active}` ? 'var(--cyan)' : '';
  });
}, { passive: true });

/* ── CARD 3D TILT ──────────────────────────── */
document.querySelectorAll('.skill-card, .proj-card, .edu-card, .ach-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const rx = (-(e.clientY - r.top  - r.height / 2) / (r.height / 2) * 5).toFixed(2);
    const ry = ( (e.clientX - r.left - r.width  / 2) / (r.width  / 2) * 5).toFixed(2);
    card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

/* ── CONSOLE EASTER EGG ──────────────────────────── */
console.log('%c👋 Hey Recruiter!', 'color:#00D4FF;font-size:2rem;font-weight:bold;');
console.log('%cTejaswini Madhav Gouda — Java Full Stack Developer 🚀', 'color:#8892B0;font-size:1rem;');
console.log('%c📧 tejaswinigouda980@gmail.com', 'color:#64FFDA;font-size:.9rem;');
console.log('%c🔗 linkedin.com/in/tejaswini-madhav-gouda', 'color:#64FFDA;font-size:.9rem;');
