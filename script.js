// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}));

// ===== PARTICLES =====
(function() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      position:absolute;
      width:${size}px;height:${size}px;
      background:rgba(99,102,241,${Math.random() * 0.5 + 0.1});
      border-radius:50%;
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      animation: particleFloat ${Math.random() * 10 + 8}s ease-in-out infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    container.appendChild(p);
  }
  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleFloat {
      0%,100%{transform:translateY(0) translateX(0);opacity:0.3}
      25%{transform:translateY(-${Math.random()*30+10}px) translateX(${Math.random()*20-10}px);opacity:0.8}
      75%{transform:translateY(${Math.random()*30+10}px) translateX(${Math.random()*20-10}px);opacity:0.4}
    }
  `;
  document.head.appendChild(style);
})();

// ===== COUNT UP =====
function countUp(el) {
  const target = parseInt(el.dataset.target);
  let current = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 25);
}

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });

// Add reveal class to cards
document.querySelectorAll('.service-card, .portfolio-card, .price-card, .team-card, .process-step, .testimonial-item').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Count up observer
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(countUp);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statObserver.observe(heroStats);

// ===== STRENGTHS TABS =====
const strengthItems = document.querySelectorAll('.strength-item');
const visualContents = document.querySelectorAll('.visual-content');

strengthItems.forEach(item => {
  item.addEventListener('click', () => {
    strengthItems.forEach(i => i.classList.remove('active'));
    visualContents.forEach(v => v.classList.remove('active'));
    item.classList.add('active');
    const idx = item.dataset.idx;
    document.querySelector(`.visual-content[data-idx="${idx}"]`)?.classList.add('active');
  });
});

// ===== PORTFOLIO FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    portfolioCards.forEach(card => {
      if (filter === 'all' || card.dataset.cat === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'none';
        card.offsetHeight;
        card.style.animation = 'fadeInUp 0.4s ease both';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== PRICING TABS =====
const priceTabs = document.querySelectorAll('.price-tab');
const priceData = {
  project: [
    { label: 'Starter', from: '15', unit: 'triệu', desc: 'Phù hợp startup & doanh nghiệp nhỏ cần giải pháp cơ bản' },
    { label: 'Professional', from: '50', unit: 'triệu', desc: 'Phù hợp doanh nghiệp vừa cần web app hoặc mobile app hoàn chỉnh' },
    { label: 'Enterprise', from: '150', unit: 'triệu', desc: 'Hệ thống lớn, ERP, SaaS platform, giải pháp AI toàn diện' },
  ],
  monthly: [
    { label: 'Starter Team', from: '20', unit: 'triệu/tháng', desc: '1 developer junior + PM bán thời gian, phù hợp dự án nhỏ liên tục' },
    { label: 'Growth Team', from: '50', unit: 'triệu/tháng', desc: '2-3 developer senior + PM + QA, team đầy đủ cho dự án trung bình' },
    { label: 'Full Team', from: '120', unit: 'triệu/tháng', desc: 'Team 5-8 người đầy đủ tech stack, DevOps, AI specialist' },
  ]
};

priceTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    priceTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const type = tab.dataset.type;
    const cards = document.querySelectorAll('.price-card');
    cards.forEach((card, i) => {
      const data = priceData[type][i];
      if (data) {
        card.querySelector('.price-label').textContent = data.label;
        card.querySelector('.price-num').textContent = data.from;
        card.querySelector('.price-unit').textContent = data.unit;
        card.querySelector('.price-desc').textContent = data.desc;
      }
    });
  });
});

// ===== TESTIMONIALS SLIDER =====
const track = document.getElementById('testimonialTrack');
const dotsContainer = document.getElementById('sliderDots');
const items = track?.querySelectorAll('.testimonial-item') || [];
let currentSlide = 0;
let autoSlide;

if (items.length && dotsContainer) {
  // Create dots
  const totalDots = Math.ceil(items.length / 2);
  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  function goToSlide(idx) {
    currentSlide = idx;
    const slideWidth = items[0].offsetWidth + 24;
    track.style.transform = `translateX(-${idx * slideWidth * 2}px)`;
    dotsContainer.querySelectorAll('.slider-dot').forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
  }

  function nextSlide() {
    const maxSlide = Math.ceil(items.length / 2) - 1;
    goToSlide(currentSlide >= maxSlide ? 0 : currentSlide + 1);
  }

  autoSlide = setInterval(nextSlide, 4000);
  track.addEventListener('mouseenter', () => clearInterval(autoSlide));
  track.addEventListener('mouseleave', () => { autoSlide = setInterval(nextSlide, 4000); });
}

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');

// sync email to _replyto field
document.getElementById('emailInput')?.addEventListener('input', (e) => {
  const replyTo = document.getElementById('replyToField');
  if (replyTo) replyTo.value = e.target.value;
});

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const btnSpan = btn.querySelector('span');
  const originalText = btnSpan.textContent;

  btn.disabled = true;
  btnSpan.textContent = 'Đang gửi...';
  formSuccess.classList.remove('visible');
  formError.classList.remove('visible');

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (res.ok || res.redirected) {
      formSuccess.classList.add('visible');
      form.reset();
      setTimeout(() => formSuccess.classList.remove('visible'), 6000);
    } else {
      formError.classList.add('visible');
    }
  } catch {
    // fallback: submit normally if fetch blocked
    form.submit();
  } finally {
    btn.disabled = false;
    btnSpan.textContent = originalText;
  }
});

// ===== BACK TO TOP =====
document.getElementById('backToTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${entry.target.id}` ? '#f1f5f9' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

// ===== SMOOTH HOVER RIPPLE ON BUTTONS =====
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    ripple.style.cssText = `
      position:absolute;left:${e.clientX-rect.left}px;top:${e.clientY-rect.top}px;
      width:0;height:0;border-radius:50%;
      background:rgba(255,255,255,0.2);transform:translate(-50%,-50%);
      animation:ripple 0.6s ease-out both;pointer-events:none;
    `;
    if (getComputedStyle(this).position === 'static') this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes ripple{to{width:200px;height:200px;opacity:0}}`;
document.head.appendChild(rippleStyle);
