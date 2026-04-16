/* ============================================================
   PASTURE + MARKET — Shared JS (v2)
   ============================================================ */
(function(){
  'use strict';

  /* ── Navbar scroll ── */
  const navbar = document.getElementById('navbar');
  if(navbar){
    function updateNav(){
      if(window.scrollY>55){
        navbar.classList.add('scrolled');
        navbar.classList.remove('transparent');
      } else {
        navbar.classList.remove('scrolled');
        navbar.classList.add('transparent');
      }
    }
    navbar.classList.add('transparent');
    window.addEventListener('scroll', updateNav, {passive:true});
  }

  /* ── Hero slideshow ── */
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  if(slides.length > 1){
    let cur = 0;
    function goSlide(n){
      slides[cur].classList.remove('active');
      dots[cur] && dots[cur].classList.remove('active');
      cur = (n + slides.length) % slides.length;
      slides[cur].classList.add('active');
      dots[cur] && dots[cur].classList.add('active');
    }
    slides[0].classList.add('active');
    dots[0] && dots[0].classList.add('active');
    let timer = setInterval(()=>goSlide(cur+1), 5500);
    dots.forEach((d,i)=>{
      d.addEventListener('click',()=>{ clearInterval(timer); goSlide(i); timer=setInterval(()=>goSlide(cur+1),5500); });
    });
  } else if(slides.length===1){
    slides[0].classList.add('active');
  }

  /* ── Mobile hamburger ── */
  const ham     = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if(ham && mobileNav){
    ham.addEventListener('click',()=>{
      ham.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(l=>{
      l.addEventListener('click',()=>{
        ham.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow='';
      });
    });
  }

  /* ── Dropdown menus ── */
  document.querySelectorAll('.dropdown-parent').forEach(p=>{
    const btn = p.querySelector('button');
    if(!btn) return;
    btn.addEventListener('click',e=>{
      e.stopPropagation();
      document.querySelectorAll('.dropdown-parent.open').forEach(o=>{ if(o!==p) o.classList.remove('open'); });
      p.classList.toggle('open');
    });
  });
  document.addEventListener('click',()=>{
    document.querySelectorAll('.dropdown-parent.open').forEach(p=>p.classList.remove('open'));
  });

  /* ── Scroll reveal ── */
  const revEls = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
  const revObs = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal,.reveal-left,.reveal-right')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(()=>entry.target.classList.add('visible'), idx*70);
      revObs.unobserve(entry.target);
    });
  },{threshold:0.1, rootMargin:'0px 0px -45px 0px'});
  revEls.forEach(el=>revObs.observe(el));

  /* ── Menu tabs ── */
  const tabs   = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');
  tabs.forEach(tab=>{
    tab.addEventListener('click',()=>{
      const t = tab.dataset.tab;
      tabs.forEach(x=>x.classList.remove('active'));
      panels.forEach(x=>x.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('tab-'+t);
      if(panel) panel.classList.add('active');
    });
  });

  /* ── Gallery filters ── */
  const gFilters = document.querySelectorAll('.gallery-filter');
  const gItems   = document.querySelectorAll('.gallery-item');
  gFilters.forEach(f=>{
    f.addEventListener('click',()=>{
      gFilters.forEach(x=>x.classList.remove('active'));
      f.classList.add('active');
      const cat = f.dataset.filter;
      gItems.forEach(item=>{
        const show = cat==='all' || item.dataset.cat===cat;
        item.style.opacity = show ? '1':'0';
        item.style.pointerEvents = show ? '':'none';
      });
    });
  });

  /* ── Lightbox ── */
  const lb     = document.getElementById('lightbox');
  const lbImg  = document.getElementById('lightbox-img');
  const lbClose= document.getElementById('lightbox-close');
  if(lb){
    gItems.forEach(item=>{
      item.addEventListener('click',()=>{
        const src = item.dataset.src;
        if(src && lbImg){ lbImg.src=src; }
        lb.classList.add('open');
        document.body.style.overflow='hidden';
      });
    });
    function closeLb(){ lb.classList.remove('open'); document.body.style.overflow=''; }
    lbClose && lbClose.addEventListener('click', closeLb);
    lb.addEventListener('click',e=>{ if(e.target===lb) closeLb(); });
    document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeLb(); });
  }

  /* ── Back to top ── */
  const btt = document.getElementById('back-to-top');
  if(btt){
    window.addEventListener('scroll',()=>{ btt.classList.toggle('visible', window.scrollY>480); },{passive:true});
    btt.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  }

  /* ── Smooth anchor scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const target = document.querySelector(a.getAttribute('href'));
      if(target){ e.preventDefault(); window.scrollTo({top:target.getBoundingClientRect().top+window.scrollY-76, behavior:'smooth'}); }
    });
  });

  /* ── Parallax ── */
  const pBgs = document.querySelectorAll('.parallax-bg');
  let pTicking = false;
  if(pBgs.length){
    window.addEventListener('scroll',()=>{
      if(!pTicking){
        requestAnimationFrame(()=>{
          pBgs.forEach(bg=>{
            const sec = bg.closest('section,.parallax-banner');
            if(!sec) return;
            const rect = sec.getBoundingClientRect();
            bg.style.transform=`translateY(${rect.top*0.28}px)`;
          });
          pTicking=false;
        });
        pTicking=true;
      }
    },{passive:true});
  }

  /* ── Form submit placeholders ── */
  ['catering-form','contact-form','employment-form'].forEach(id=>{
    const form = document.getElementById(id);
    if(!form) return;
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const btn = form.querySelector('.btn-submit');
      const orig = btn.textContent;
      btn.textContent='Sent ✓';
      btn.style.background='#3d5238';
      btn.style.color='var(--ivory)';
      setTimeout(()=>{ btn.textContent=orig; btn.style.background=''; btn.style.color=''; form.reset(); },3200);
    });
  });

  /* ── Footer year ── */
  const yr = document.getElementById('year');
  if(yr) yr.textContent = new Date().getFullYear();

  /* ── Active nav link highlight ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a=>{
    const href = a.getAttribute('href');
    if(href && href !== '#' && currentPage.includes(href.replace('.html',''))) {
      a.classList.add('active-page');
    }
  });

})();
