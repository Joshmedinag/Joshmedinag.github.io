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
    stage.removeAttribute('aria-busy');
    const poster = stage.querySelector('[data-reel-poster]');
    if (poster) poster.hidden = true;
    const fallback = stage.querySelector('[data-vimeo-fallback]');
    if (fallback) fallback.hidden = false;
    const playButton = stage.querySelector('[data-reel-play]');
    if (document.activeElement === playButton || document.activeElement === frame) fallback?.querySelector('a')?.focus({preventScroll:true});
    const reel = stage.closest('.reel-section');
    reel?.classList.remove('is-playing','is-darkroom');
    const toggle = reel?.querySelector('[data-theater-toggle]');
    if (toggle) { toggle.disabled = true; toggle.setAttribute('aria-pressed','false'); toggle.textContent = 'Darkroom mode'; }
    stage.dataset.vimeoStatus = 'unavailable';
  };
  window.portfolioVimeo = frame => {
    if (players.has(frame)) return players.get(frame);
    const stage = frame.closest('[data-vimeo-stage]');
    if (stage) { stage.dataset.vimeoStatus = 'loading'; stage.setAttribute('aria-busy','true'); }
    // Cross-origin load events cannot confirm a usable video; use the official handshake.
    const promise = new Promise((resolve,reject) => {
      let settled = false;
      const fail = error => {
        clearTimeout(timeout);
        settled = true;
        showFallback(frame);
        reject(error);
      };
      const timeout = setTimeout(() => fail(new Error('Vimeo timed out')),16000);
      loadSdk().then(() => {
        const player = new window.Vimeo.Player(frame);
        player.on('error', error => {
          if (error?.name === 'NotAllowedError' || ['setCurrentTime','requestFullscreen'].includes(error?.method)) return;
          fail(error);
        });
        return player.ready().then(() => player.getVideoTitle()).then(() => {
          if (settled) return;
          clearTimeout(timeout);
          settled = true;
          if (stage) {
            stage.dataset.vimeoStatus = 'ready';
            stage.removeAttribute('aria-busy');
            const poster = stage.querySelector('[data-reel-poster]');
            const hadFocus = document.activeElement === poster?.querySelector('[data-reel-play]');
            frame.hidden = false;
            if (poster) poster.hidden = true;
            if (hadFocus) frame.focus({preventScroll:true});
            stage.dispatchEvent(new CustomEvent('portfolio:reelready',{bubbles:true,detail:{stage,frame,player}}));
          }
          resolve(player);
        });
      }).catch(fail);
    });
    players.set(frame,promise);
    return promise;
  };

  document.querySelectorAll('[data-vimeo-stage]').forEach(stage => {
    const playButton = stage.querySelector('[data-reel-play]');
    if (playButton) {
      // No Vimeo iframe or SDK request is made until the visitor presses Play.
      stage.dataset.vimeoStatus = 'idle';
      playButton.hidden = false;
      playButton.addEventListener('click', () => {
        if (stage.dataset.vimeoStatus !== 'idle') return;
        const url = new URL(stage.dataset.vimeoUrl);
        url.searchParams.set('autoplay','1');
        url.searchParams.set('playsinline','1');
        const frame = document.createElement('iframe');
        frame.src = url.href;
        frame.title = stage.dataset.vimeoTitle;
        frame.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
        frame.allowFullscreen = true;
        frame.referrerPolicy = 'strict-origin-when-cross-origin';
        frame.hidden = true;
        playButton.disabled = true;
        playButton.querySelector('[data-reel-play-label]').textContent = 'Connecting…';
        stage.append(frame);
        window.portfolioVimeo(frame).then(player => {
          // Autoplay may be denied after a click; native player controls remain available.
          player.play().catch(() => {});
        }).catch(() => {});
      });
      return;
    }
    const frame = stage.querySelector('iframe');
    if (!frame) return;
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        observer.disconnect();
        window.portfolioVimeo(frame).catch(() => {});
      },{rootMargin:'100px'});
      observer.observe(frame);
    } else window.portfolioVimeo(frame).catch(() => {});
  });
})();
