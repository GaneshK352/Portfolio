// script.js
(function() {
  // ==================== THEME TOGGLE ====================
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const icon = themeToggle.querySelector('i');
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    body.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
  }
  
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      icon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('theme', 'dark');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('theme', 'light');
    }
  });

  // ==================== SCROLL PROGRESS ====================
  const progressBar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });

  // ==================== SECTION REVEAL (INTERSECTION OBSERVER) ====================
  const sections = document.querySelectorAll('.section');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  sections.forEach(s => sectionObserver.observe(s));

  // ==================== PROJECT TOGGLES + STAGGERED REVEAL ====================
  const projectItems = document.querySelectorAll('[data-project]');
  
  // set initial state: bullets hidden
  projectItems.forEach(item => {
    const bulletsDiv = item.querySelector('[data-bullets]');
    const toggleBtn = item.querySelector('[data-toggle]');
    if (bulletsDiv && toggleBtn) {
      bulletsDiv.classList.remove('show'); // ensure hidden
      toggleBtn.textContent = 'Show details';
      
      // toggle click
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isNowShowing = bulletsDiv.classList.toggle('show');
        toggleBtn.textContent = isNowShowing ? 'Hide details' : 'Show details';
      });
    }
  });

  // when project enters view, reveal bullets with staggered animation (only if not manually toggled yet)
  const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const item = entry.target;
        const bulletsDiv = item.querySelector('[data-bullets]');
        // only auto-show if not previously toggled by user (we can check if it's still hidden)
        if (bulletsDiv && !bulletsDiv.classList.contains('show')) {
          // set staggered animation via style (already in CSS using var(--i))
          const listItems = bulletsDiv.querySelectorAll('li');
          listItems.forEach((li, idx) => {
            li.style.setProperty('--i', idx);
          });
          bulletsDiv.classList.add('show');
          // also update button text
          const btn = item.querySelector('[data-toggle]');
          if (btn) btn.textContent = 'Hide details';
        }
        // unobserve after reveal (optional, to prevent re-trigger)
        projectObserver.unobserve(item);
      }
    });
  }, { threshold: 0.2 });

  projectItems.forEach(item => projectObserver.observe(item));

  // ==================== EXPERIENCE TIMELINE BULLET STAGGER ====================
  // (already handled by CSS if we want, but we can set --i for each li)
  const expLists = document.querySelectorAll('.exp-item .exp-points');
  expLists.forEach(list => {
    const items = list.querySelectorAll('li');
    items.forEach((li, idx) => {
      li.style.setProperty('--i', idx);
    });
  });

  // ==================== SUBTLE CANVAS PARTICLES ====================
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function initParticles() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    const particleCount = Math.min(60, Math.floor(width * height / 15000));
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.3 + 0.1
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#3b82f6';
    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`;
      ctx.fill();
      
      p.x += p.speedX;
      p.y += p.speedY;
      
      // wrap
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
    }
    requestAnimationFrame(drawParticles);
  }

  window.addEventListener('resize', () => {
    initParticles();
  });

  initParticles();
  drawParticles();

  // ==================== SMOOTH ANCHOR SCROLLING ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();