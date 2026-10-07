(() => {
  'use strict';
  let sdkPromise;
  const players = new WeakMap();
  const loadSdk = () => {
    if (window.Vimeo?.Player) return Promise.resolve();
    if (!sdkPromise) sdkPromise = new Promise((resolve,reject) => {
      const script = document.createElement('script');
      script.src = 'https://player.vimeo.com/api/player.js';
      script.async = true;
      script.onload = resolve;
      script.onerror = () => reject(new Error('Vimeo unavailable'));
      document.head.append(script);
    });
    return sdkPromise;
  };
  const showFallback = frame => {
    const stage = frame.closest('[data-vimeo-stage]');
    if (!stage) return;
    frame.hidden = true;
    const fallback = stage.querySelector('[data-vimeo-fallback]');
    if (fallback) fallback.hidden = false;
    const reel = stage.closest('.reel-section');
    reel?.classList.remove('is-playing','is-darkroom');
    const toggle = reel?.querySelector('[data-theater-toggle]');
    if (toggle) { toggle.disabled = true; toggle.setAttribute('aria-pressed','false'); }
    stage.dataset.vimeoStatus = 'unavailable';
  };
  window.portfolioVimeo = frame => {
    if (players.has(frame)) return players.get(frame);
    const status = frame.closest('[data-vimeo-stage]');
    if (status) status.dataset.vimeoStatus = 'loading';
    // Cross-origin iframe load events cannot confirm a usable video.
    // The official player handshake catches privacy and embed errors.
    const promise = new Promise((resolve,reject) => {
      const timeout = setTimeout(() => reject(new Error('Vimeo timed out')),16000);
      loadSdk().then(() => {
        const player = new window.Vimeo.Player(frame);
        player.on('error', () => showFallback(frame));
        return player.ready().then(() => player.getVideoTitle()).then(() => {
          clearTimeout(timeout);
          if (status) status.dataset.vimeoStatus = 'ready';
          resolve(player);
        });
      }).catch(error => { clearTimeout(timeout); reject(error); });
    }).catch(error => { showFallback(frame); throw error; });
    players.set(frame,promise);
    return promise;
  };
  const frames = document.querySelectorAll('[data-vimeo-stage] iframe');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        window.portfolioVimeo(entry.target).catch(() => {});
      });
    },{rootMargin:'100px'});
    frames.forEach(frame => observer.observe(frame));
  } else frames.forEach(frame => window.portfolioVimeo(frame).catch(() => {}));
})();
