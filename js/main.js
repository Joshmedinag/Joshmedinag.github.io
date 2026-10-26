(() => {
  'use strict';
  document.documentElement.classList.add('has-js');
  const spanish = document.documentElement.lang.toLowerCase().split('-')[0] === 'es';
  const openNavigationLabel = spanish ? 'Abrir navegación' : 'Open navigation';
  const closeNavigationLabel = spanish ? 'Cerrar navegación' : 'Close navigation';
  const config = window.PORTFOLIO_CONFIG || {};
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.navigation');
  const closeMenu = (restoreFocus = false) => {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', openNavigationLabel);
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    if (restoreFocus) toggle.focus();
  };
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? closeNavigationLabel : openNavigationLabel);
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
      if (open) nav.querySelector('a')?.focus();
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
      if (event.key === 'Tab' && toggle.getAttribute('aria-expanded') === 'true') {
        const controls = Array.from(document.querySelectorAll('.site-header a, .site-header button')).filter(element => element.getClientRects().length);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });
    document.addEventListener('focusin', event => {
      if (toggle.getAttribute('aria-expanded') === 'true' && !event.target.closest('.site-header')) closeMenu();
    });
    window.matchMedia('(min-width: 1051px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
  }

  const sectionLinks = new Set(Array.from(document.querySelectorAll('.navigation a'), link => link.getAttribute('href')));
  const sections = Array.from(document.querySelectorAll('main > section[id]')).filter(section => sectionLinks.has('#' + section.id));
  if ('IntersectionObserver' in window && sections.length) {
    const sectionVisibility = new Map(sections.map(section => [section, 0]));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => sectionVisibility.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0));
      const visible = Array.from(sectionVisibility.entries()).filter(([, ratio]) => ratio > 0).sort((a, b) => b[1] - a[1]);
      if (!visible.length) return;
      const current = '#' + visible[0][0].id;
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
    const deferredSlides = heroCarousel.querySelector('[data-carousel-slides]');
    const slides = [...heroCarousel.querySelectorAll('.hero-image'), ...(deferredSlides?.content.querySelectorAll('.hero-image') || [])];
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const controls = document.querySelector('.carousel-controls');
    const pauseButton = controls?.querySelector('[data-carousel-pause]');
    const count = controls?.querySelector('[data-carousel-count]');
    const projectLink = document.querySelector('[data-carousel-project]');
    const projectIndex = projectLink?.querySelector('[data-carousel-project-index]');
    const projectTitle = projectLink?.querySelector('[data-carousel-project-title]');
    const projectRole = projectLink?.querySelector('[data-carousel-project-role]');
    const requestedInterval = Number.parseInt(heroCarousel.dataset.interval || '', 10);
    const interval = Number.isFinite(requestedInterval) ? Math.max(requestedInterval, 3500) : 5600;
    let current = Math.max(0, slides.findIndex(slide => slide.classList.contains('is-active')));
    let timer = 0;
    let pausedByUser = true;
    let inView = true;
    let slideRequest = 0;
    const prepareSlide = slide => {
      if (!slide.isConnected) heroCarousel.append(slide);
      if (slide.complete && slide.naturalWidth) return Promise.resolve(true);
      return slide.decode().then(() => true, () => false);
    };
    const updateControls = () => {
      if (count) count.textContent = String(current + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
      const slide = slides[current];
      if (projectLink && slide?.dataset.projectHref) projectLink.href = slide.dataset.projectHref;
      if (projectIndex) projectIndex.textContent = String(current + 1).padStart(2, '0');
      if (projectTitle) projectTitle.textContent = slide?.dataset.projectTitle || '';
      if (projectRole) projectRole.textContent = slide?.dataset.projectRole || '';
      if (pauseButton) {
        pauseButton.textContent = pausedByUser ? 'Play slideshow' : 'Pause';
        pauseButton.setAttribute('aria-pressed', String(pausedByUser));
        pauseButton.setAttribute('aria-label', (pausedByUser ? 'Play slideshow' : 'Pause') + ' featured project slideshow');
      }
    };
    const showSlide = async (direction, animate = true) => {
      if (slides.length < 2) return;
      heroCarousel.classList.toggle('is-instant', !animate);
      const target = (current + direction + slides.length) % slides.length;
      const request = ++slideRequest;
      if (!await prepareSlide(slides[target]) || request !== slideRequest) return;
      const previous = slides[current];
      current = target;
      const next = slides[current];
      slides.forEach(slide => slide.classList.remove('is-leaving'));
      previous.classList.remove('is-active');
      previous.classList.add('is-leaving');
      next.classList.add('is-active');
      heroCarousel.dispatchEvent(new CustomEvent('portfolio:slidechange', { bubbles: true, detail: { slide: next, index: current, animate } }));
      window.setTimeout(() => previous.classList.remove('is-leaving'), 1500);
      updateControls();
      prepareSlide(slides[(current + 1) % slides.length]);
    };
    const stopCarousel = () => { if (timer) window.clearInterval(timer); timer = 0; };
    const startCarousel = () => {
      stopCarousel();
      if (!pausedByUser && inView && slides.length > 1 && !document.hidden) timer = window.setInterval(() => showSlide(1), interval);
    };
    if (controls && slides.length > 1) {
      controls.hidden = false;
      controls.querySelector('[data-carousel-prev]')?.addEventListener('click', event => { pausedByUser = true; stopCarousel(); updateControls(); showSlide(-1, event.detail > 0); });
      controls.querySelector('[data-carousel-next]')?.addEventListener('click', event => { pausedByUser = true; stopCarousel(); updateControls(); showSlide(1, event.detail > 0); });
      pauseButton?.addEventListener('click', () => { pausedByUser = !pausedByUser; updateControls(); startCarousel(); });
    }
    if ('IntersectionObserver' in window) {
      const heroObserver = new IntersectionObserver(entries => {
        inView = entries[0].isIntersecting;
        startCarousel();
      }, { threshold: 0.1 });
      heroObserver.observe(heroCarousel);
    }
    motionPreference.addEventListener('change', event => {
      if (event.matches) pausedByUser = true;
      updateControls();
      startCarousel();
    });
    document.addEventListener('visibilitychange', () => { if (document.hidden) stopCarousel(); else startCarousel(); });
    updateControls();
    // Images stay deferred until the visitor starts the slideshow or selects a frame.
    startCarousel();
  }

  const localVideos = Array.from(document.querySelectorAll('video'));
  localVideos.forEach(video => video.addEventListener('play', () => {
    localVideos.forEach(other => { if (other !== video && !other.paused) other.pause(); });
  }));

  const workToolbar = document.querySelector('[data-work-filters]');
  if (workToolbar) {
    const details = workToolbar.closest('details');
    const buttons = Array.from(workToolbar.querySelectorAll('[data-filter]'));
    const cards = Array.from(details.querySelectorAll('.project-card'));
    const status = workToolbar.querySelector('[data-filter-status]');
    const categories = new Set(buttons.map(button => button.dataset.filter));
    const filterWork = (category, updateUrl = false) => {
      if (!categories.has(category)) category = 'all';
      let visible = 0;
      cards.forEach(card => { card.hidden = category !== 'all' && !card.dataset.category.split(' ').includes(category); if (!card.hidden) visible++; });
      buttons.forEach(button => button.setAttribute('aria-pressed',String(button.dataset.filter === category)));
      status.textContent = visible ? `${visible} ${visible === 1 ? 'study' : 'studies'}` : 'No studies in this category. Choose All studies.';
      if (updateUrl) {
        const url = new URL(location.href);
        if (category === 'all') url.searchParams.delete('category'); else url.searchParams.set('category',category);
        history.replaceState(history.state,'',url);
      }
      document.dispatchEvent(new CustomEvent('portfolio:workchange'));
    };
    workToolbar.hidden = false;
    buttons.forEach(button => button.addEventListener('click',() => filterWork(button.dataset.filter,true)));
    const category = new URLSearchParams(location.search).get('category');
    if (category && category !== 'all' && category !== 'pipeline') details.open = true;
    filterWork(category || 'all');
    if (category === 'pipeline') requestAnimationFrame(() => document.getElementById('pipeline-lab')?.scrollIntoView());
  }

  const safeExternal = value => {
    try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; } catch { return null; }
  };
  if (typeof config.email === 'string' && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(config.email)) {
    document.querySelectorAll('[data-email-address]').forEach(element => { element.textContent = config.email; });
    document.querySelectorAll('[data-email-link]').forEach(link => { link.href = 'mailto:' + config.email; });
    document.querySelectorAll('[data-copy-email]').forEach(button => { button.dataset.email = config.email; });
  }
  document.querySelectorAll('[data-profile]').forEach(link => {
    const href = safeExternal(config[link.dataset.profile]);
    if (href) link.href = href;
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
          if (['vimeo.com','player.vimeo.com'].includes(host) && stage.querySelector('[data-reel-play]')) {
            // Preserve the poster: the Vimeo iframe is created only after a click.
            stage.dataset.vimeoUrl = embed;
          } else {
            player = document.createElement('iframe');
            player.src = embed;
            player.title = 'Joshua Medina showreel';
            player.allow = 'fullscreen; picture-in-picture; encrypted-media';
            player.allowFullscreen = true;
            player.loading = 'lazy';
            player.referrerPolicy = 'strict-origin-when-cross-origin';
          }
        }
      }
      if (player && stage.querySelector('iframe')?.src !== player.src) stage.replaceChildren(player);
      if (secure) document.querySelectorAll('[data-reel-link]').forEach(link => { link.href = url.href; });
    } catch { /* An invalid override preserves the static player and link. */ }
  }
})();
