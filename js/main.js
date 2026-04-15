/* ============================================================
   PASTURE + MARKET — Main JavaScript
   ============================================================ */

(function() {
  'use strict';

  /* ---- Navbar: scroll state ---- */
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
      navbar.classList.remove('transparent');
    } else {
      navbar.classList.remove('scrolled');
      navbar.classList.add('transparent');
    }
  }

  navbar.classList.add('transparent');
  window.addEventListener('scroll', updateNavbar, { passive: true });

  /* ---- Hero load animation ---- */
  const hero = document.getElementById('hero');
  if (hero) {
    setTimeout(() => hero.classList.add('loaded'), 100);
  }

  /* ---- Mobile hamburger ---- */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Dropdown menus ---- */
  document.querySelectorAll('.dropdown-parent').forEach(parent => {
    const btn = parent.querySelector('button');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Close others
      document.querySelectorAll('.dropdown-parent.open').forEach(other => {
        if (other !== parent) other.classList.remove('open');
      });
      parent.classList.toggle('open');
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-parent.open').forEach(p => p.classList.remove('open'));
  });

  /* ---- Scroll reveal ---- */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = entry.target.parentElement.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        let delay = 0;
        siblings.forEach((el, idx) => {
          if (el === entry.target) delay = idx * 80;
        });
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ---- Menu tabs ---- */
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuPanels = document.querySelectorAll('.menu-panel');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      menuTabs.forEach(t => t.classList.remove('active'));
      menuPanels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('tab-' + target);
      if (panel) panel.classList.add('active');
    });
  });

  /* ---- Gallery filters ---- */
  const galleryFilters = document.querySelectorAll('.gallery-filter');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      galleryFilters.forEach(f => f.classList.remove('active'));
      filter.classList.add('active');

      const cat = filter.dataset.filter;

      galleryItems.forEach(item => {
        if (cat === 'all' || item.dataset.cat === cat) {
          item.style.display = '';
          setTimeout(() => item.style.opacity = '1', 10);
        } else {
          item.style.opacity = '0';
          setTimeout(() => item.style.display = 'none', 300);
        }
      });
    });
  });

  /* ---- Lightbox ---- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  if (lightbox) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        // In production, this would show the actual image
        // Here we show a placeholder message
        const src = item.dataset.src || '';
        if (src) {
          lightboxImg.src = src;
        }
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  /* ---- Back to top ---- */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- Form micro-interactions ---- */
  document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(el => {
    el.addEventListener('focus', () => {
      el.closest('.form-group').classList.add('focused');
    });
    el.addEventListener('blur', () => {
      el.closest('.form-group').classList.remove('focused');
    });
  });

  /* ---- Form submit handlers (placeholder) ---- */
  ['catering-form', 'contact-form', 'employment-form'].forEach(id => {
    const form = document.getElementById(id);
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.btn-submit');
        const originalText = btn.textContent;
        btn.textContent = 'Message Sent ✓';
        btn.style.background = '#3d5238';
        btn.style.color = '#f5f0e8';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.color = '';
          form.reset();
        }, 3000);
        // NOTE: Wire up your actual form submission (Formspree, etc.) here
      });
    }
  });

  /* ---- Parallax (subtle, performance-friendly) ---- */
  const parallaxBgs = document.querySelectorAll('.parallax-bg');

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        parallaxBgs.forEach(bg => {
          const section = bg.closest('section, .parallax-banner');
          if (!section) return;
          const rect = section.getBoundingClientRect();
          const speed = 0.3;
          const offset = rect.top * speed;
          bg.style.transform = `translateY(${offset}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinksAll.forEach(link => {
          link.parentElement.classList.remove('active-section');
          if (link.getAttribute('href') === '#' + id) {
            link.parentElement.classList.add('active-section');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

})();
