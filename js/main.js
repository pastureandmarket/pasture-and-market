/* ============================================================
   PASTURE + MARKET — JS v3 (Frutiger Aero / Fresh Farm)
   ============================================================ */
(function () {
  'use strict';

  /* ── Navbar scroll ── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    function updateNav() {
      if (window.scrollY > 55) {
        navbar.classList.add('scrolled');
        navbar.classList.remove('transparent');
      } else {
        navbar.classList.remove('scrolled');
        navbar.classList.add('transparent');
      }
    }
    navbar.classList.add('transparent');
    window.addEventListener('scroll', updateNav, { passive: true });
  }

  /* ── Hero slideshow ── */
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  if (slides.length > 1) {
    let cur = 0;
    function goSlide(n) {
      slides[cur].classList.remove('active');
      dots[cur] && dots[cur].classList.remove('active');
      cur = (n + slides.length) % slides.length;
      slides[cur].classList.add('active');
      dots[cur] && dots[cur].classList.add('active');
    }
    slides[0].classList.add('active');
    dots[0] && dots[0].classList.add('active');
    let timer = setInterval(() => goSlide(cur + 1), 5500);
    dots.forEach((d, i) => {
      d.addEventListener('click', () => {
        clearInterval(timer);
        goSlide(i);
        timer = setInterval(() => goSlide(cur + 1), 5500);
      });
    });
  } else if (slides.length === 1) {
    slides[0].classList.add('active');
    dots[0] && dots[0].classList.add('active');
  }

  /* ── Mobile hamburger ── */
  const ham = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (ham && mobileNav) {
    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(l => {
      l.addEventListener('click', () => {
        ham.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Dropdown menus ── */
  document.querySelectorAll('.dropdown-parent').forEach(p => {
    const btn = p.querySelector('button');
    if (!btn) return;
    btn.addEventListener('click', e => {
      e.stopPropagation();
      document.querySelectorAll('.dropdown-parent.open').forEach(o => { if (o !== p) o.classList.remove('open'); });
      p.classList.toggle('open');
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-parent.open').forEach(p => p.classList.remove('open'));
  });

  /* ── Scroll reveal ── */
  const revEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal, .reveal-left, .reveal-right')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), idx * 80);
      revObs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revEls.forEach(el => revObs.observe(el));

  /* ── Menu tabs ── */
  const tabs   = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const t = tab.dataset.tab;
      tabs.forEach(x => x.classList.remove('active'));
      panels.forEach(x => x.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('tab-' + t);
      if (panel) panel.classList.add('active');
    });
  });

  /* ── Gallery filters ── */
  const gFilters = document.querySelectorAll('.gallery-filter');
  const gItems   = document.querySelectorAll('.gallery-item');
  gFilters.forEach(f => {
    f.addEventListener('click', () => {
      gFilters.forEach(x => x.classList.remove('active'));
      f.classList.add('active');
      const cat = f.dataset.filter;
      gItems.forEach(item => {
        const show = cat === 'all' || item.dataset.cat === cat;
        item.style.opacity    = show ? '1' : '0';
        item.style.pointerEvents = show ? '' : 'none';
      });
    });
  });

  /* ── Lightbox ── */
  const lb    = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCls = document.getElementById('lightbox-close');
  if (lb) {
    gItems.forEach(item => {
      item.addEventListener('click', () => {
        const src = item.dataset.src;
        if (src && lbImg) lbImg.src = src;
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    function closeLb() { lb.classList.remove('open'); document.body.style.overflow = ''; }
    lbCls && lbCls.addEventListener('click', closeLb);
    lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
  }

  /* ── Back to top ── */
  const btt = document.getElementById('back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => { btt.classList.toggle('visible', window.scrollY > 500); }, { passive: true });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── Smooth anchor scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
      }
    });
  });

  /* ── Parallax ── */
  const pBgs = document.querySelectorAll('.parallax-bg');
  let pTick = false;
  if (pBgs.length) {
    window.addEventListener('scroll', () => {
      if (!pTick) {
        requestAnimationFrame(() => {
          pBgs.forEach(bg => {
            const sec = bg.closest('.parallax-banner, section');
            if (!sec) return;
            bg.style.transform = `translateY(${sec.getBoundingClientRect().top * 0.28}px)`;
          });
          pTick = false;
        });
        pTick = true;
      }
    }, { passive: true });
  }

  /* ── Duplicate marquee for seamless loop ── */
  const track = document.querySelector('.tagline-track');
  if (track) {
    const clone = track.cloneNode(true);
    track.parentElement.appendChild(clone);
  }

  /* ── Form submits (placeholder) ── */
  ['catering-form', 'contact-form', 'employment-form'].forEach(id => {
    const form = document.getElementById(id);
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.btn-submit');
      const orig = btn.textContent;
      btn.textContent = '✓ Sent!';
      btn.style.background = 'linear-gradient(135deg, #2d5a34, #3d7a45)';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.style.color = '';
        form.reset();
      }, 3500);
      // REPLACE: Wire to your backend (Formspree, etc.)
    });
  });

  /* ── Footer year ── */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ── Menu page: jump to tab from URL hash ── */
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const tab = document.querySelector(`[data-tab="${hash}"]`);
    if (tab) setTimeout(() => tab.click(), 100);
  }

})();
