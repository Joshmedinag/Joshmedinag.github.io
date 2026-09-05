(() => {
  'use strict';
  const config = window.PORTFOLIO_CONFIG || {};
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.navigation');
  const closeMenu = (restoreFocus = false) => {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    if (restoreFocus) toggle.focus();
  };
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
    });
    document.addEventListener('focusin', event => {
      if (toggle.getAttribute('aria-expanded') === 'true' && !event.target.closest('.site-header')) closeMenu();
    });
    window.matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
  }

  const sectionLinks = new Set(Array.from(document.querySelectorAll('.navigation a'), link => link.getAttribute('href')));
  const sections = Array.from(document.querySelectorAll('main > section[id]')).filter(section => sectionLinks.has('#' + section.id));
  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio);
      if (!visible.length) return;
      const current = '#' + visible[0].target.id;
      document.querySelectorAll('.navigation a').forEach(link => {
        const active = link.getAttribute('href') === current;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-15% 0px -55% 0px', threshold: [0, 0.1, 0.3] });
    sections.forEach(section => observer.observe(section));
  }

  document.querySelectorAll('[data-year]').forEach(element => { element.textContent = new Date().getFullYear(); });

  const heroCarousel = document.querySelector('[data-hero-carousel]');
  if (heroCarousel) {
    const slides = Array.from(heroCarousel.querySelectorAll('.hero-image'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const requestedInterval = Number.parseInt(heroCarousel.dataset.interval || '', 10);
    const interval = Number.isFinite(requestedInterval) ? Math.max(requestedInterval, 3500) : 5600;
    let current = Math.max(0, slides.findIndex(slide => slide.classList.contains('is-active')));
    let timer = 0;
    const showNext = () => {
      const previous = slides[current];
      current = (current + 1) % slides.length;
      const next = slides[current];
      slides.forEach(slide => slide.classList.remove('is-leaving'));
      previous.classList.remove('is-active');
      previous.classList.add('is-leaving');
      next.classList.add('is-active');
      window.setTimeout(() => previous.classList.remove('is-leaving'), 1500);
    };
    const stopCarousel = () => { if (timer) window.clearInterval(timer); timer = 0; };
    const startCarousel = () => {
      stopCarousel();
      if (!reducedMotion && slides.length > 1 && !document.hidden) timer = window.setInterval(showNext, interval);
    };
    document.addEventListener('visibilitychange', () => { if (document.hidden) stopCarousel(); else startCarousel(); });
    startCarousel();
  }

  const safeExternal = value => {
    try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; } catch { return null; }
  };
  document.querySelectorAll('[data-contact-links]').forEach(container => {
    const links = [];
    if (typeof config.email === 'string' && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(config.email)) {
      const email = document.createElement('a');
      email.href = 'mailto:' + encodeURIComponent(config.email);
      email.textContent = config.email + ' ↗';
      links.push(email);
    }
    ['linkedin', 'github', 'vimeo'].forEach(key => {
      const href = safeExternal(config[key]);
      if (!href) return;
      const link = document.createElement('a');
      link.href = href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = {linkedin:'LinkedIn',github:'GitHub',vimeo:'Vimeo'}[key] + ' ↗';
      link.setAttribute('aria-label', link.textContent.replace(' ↗','') + ' (opens in a new tab)');
      links.push(link);
    });
    if (links.length) container.replaceChildren(...links);
  });

  const stage = document.getElementById('reel-stage');
  if (stage && typeof config.showreel === 'string' && config.showreel.trim()) {
    try {
      const url = new URL(config.showreel, document.baseURI);
      const secure = url.protocol === 'https:' || url.origin === window.location.origin;
      let player;
      if (secure && /\.(mp4|webm|ogv)$/i.test(url.pathname)) {
        player = document.createElement('video');
        player.controls = true;
        player.playsInline = true;
        player.preload = 'metadata';
        player.setAttribute('aria-label', 'Joshua Medina showreel');
        player.src = url.href;
        player.addEventListener('error', () => {
          const note = document.createElement('p');
          note.className = 'reel-error';
          note.textContent = 'The showreel could not be loaded. Please try again later.';
          stage.replaceChildren(note);
        }, { once: true });
      } else if (url.protocol === 'https:') {
        let embed = '';
        const host = url.hostname.replace(/^www\./, '');
        if (['youtube.com', 'youtu.be', 'youtube-nocookie.com'].includes(host)) {
          const id = host === 'youtu.be' ? url.pathname.slice(1) : url.searchParams.get('v') || url.pathname.split('/').filter(Boolean).pop();
          if (/^[\w-]{11}$/.test(id || '')) embed = 'https://www.youtube-nocookie.com/embed/' + id;
        } else if (['vimeo.com','player.vimeo.com'].includes(host)) {
          const segments = url.pathname.split('/').filter(Boolean);
          const id = segments.find(segment => /^\d+$/.test(segment));
          const hash = url.searchParams.get('h') || segments[segments.indexOf(id) + 1];
          if (id) embed = 'https://player.vimeo.com/video/' + id + '?dnt=1' + (hash && /^[\da-f]+$/i.test(hash) ? '&h=' + hash : '');
        }
        if (embed) {
          player = document.createElement('iframe');
          player.src = embed;
          player.title = 'Joshua Medina showreel';
          player.allow = 'fullscreen; picture-in-picture; encrypted-media';
          player.allowFullscreen = true;
          player.loading = 'lazy';
          player.referrerPolicy = 'strict-origin-when-cross-origin';
        }
      }
      if (player && stage.querySelector('iframe')?.src !== player.src) stage.replaceChildren(player);
      const directLink = document.querySelector('[data-reel-link]');
      if (directLink && secure) directLink.href = url.href;
    } catch { /* An invalid override preserves the static player and link. */ }
  }
})();
