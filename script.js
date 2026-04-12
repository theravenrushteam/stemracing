// ========== PARTICLES ==========
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

for (let i = 0; i < 60; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 1.5 + 0.5,
    alpha: Math.random() * 0.4 + 0.1
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
    
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`;
    ctx.fill();
  });
  
  // Draw connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  
  requestAnimationFrame(drawParticles);
}

drawParticles();

// ========== SPEED LINES ==========
const speedContainer = document.getElementById('speedLines');
if (speedContainer) {
  for (let i = 0; i < 8; i++) {
    const line = document.createElement('div');
    line.className = 'speed-line';
    line.style.top = `${15 + Math.random() * 70}%`;
    line.style.width = `${100 + Math.random() * 200}px`;
    line.style.animationDelay = `${Math.random() * 3}s`;
    line.style.animationDuration = `${2 + Math.random() * 3}s`;
    speedContainer.appendChild(line);
  }
}

// ========== MOUSE PARALLAX ==========
let mouseX = 0,
  mouseY = 0;

document.addEventListener('mousemove', e => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

function updateParallax() {
  const hero = document.getElementById('heroContent');
  if (hero) {
    hero.style.transform = `translate(${mouseX * -8}px, ${mouseY * -5}px)`;
  }

  const o1 = document.getElementById('orb1');
  const o2 = document.getElementById('orb2');

  if (o1) o1.style.transform = `translate(${mouseX * 20}px, ${mouseY * 15}px)`;
  if (o2) o2.style.transform = `translate(${mouseX * -15}px, ${mouseY * -10}px)`;

  requestAnimationFrame(updateParallax);
}

updateParallax();

// ========== TILT CARDS ==========
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ========== SCROLL REVEAL ==========
function initRevealAnimations() {
  const wrap = document.getElementById('mainWrap');
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const check = () => {
    els.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.88) {
        el.classList.add('visible');
      }
    });
  };

  if (wrap) {
    wrap.addEventListener('scroll', check);
  }

  check();
}

initRevealAnimations();

// ========== GRAPH ANIMATION ==========
function animateGraphBars() {
  const dataLine = document.getElementById('dataLine');
  const dataPoints = document.getElementById('dataPoints');

  if (dataLine) {
    dataLine.style.opacity = '1';
    dataLine.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

    const len = dataLine.getTotalLength();
    dataLine.style.strokeDasharray = len;
    dataLine.style.strokeDashoffset = len;

    setTimeout(() => {
      dataLine.style.strokeDashoffset = '0';
    }, 100);
  }

  if (dataPoints) {
    dataPoints.style.transition = 'opacity 1.5s ease-out';
    dataPoints.style.opacity = '1';
  }
}

// Animate graph on page load if on data page
if (window.location.pathname.includes('data.html') || window.location.href.includes('data.html')) {
  setTimeout(animateGraphBars, 500);
}

// ========== CONTACT FORM ==========
function handleContact(e) {
  e.preventDefault();

  const name = document.getElementById('contactName').value;
  const email = document.getElementById('contactEmail').value;
  const msg = document.getElementById('contactMsg').value;

  const subject = `New Contact from ${name}`;
  const body = `Name: ${name}%0DEmail: ${email}%0D%0DMessage:%0D${msg}`;
  const contactEmail = 'ravenrush.ethara@gmail.com';

  window.open(`mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${body}`, '_blank');

  document.getElementById('contactSuccess').classList.remove('hidden');
  document.getElementById('contactBtn').textContent = 'Message Ready!';

  setTimeout(() => {
    document.getElementById('contactSuccess').classList.add('hidden');
    document.getElementById('contactBtn').textContent = 'Send Message';
    e.target.reset();
  }, 3000);
}

// ========== HEADER SCROLL EFFECT ==========
const mainWrap = document.getElementById('mainWrap');
const mainHeader = document.getElementById('mainHeader');

if (mainWrap) {
  mainWrap.addEventListener('scroll', function() {
    if (this.scrollTop > 50) {
      mainHeader.style.background = 'rgba(10,14,26,0.95)';
    } else {
      mainHeader.style.background = 'rgba(10,14,26,0.85)';
    }
  });
}

// ========== MOBILE MENU TOGGLE ==========
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.getElementById('hamburger');

  if (menu) menu.classList.toggle('open');
  if (hamburger) hamburger.classList.toggle('open');
}

// ========== SET ACTIVE NAV LINK ==========
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

setActiveNavLink();

// ========== INIT LUCIDE ICONS ==========
if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}
