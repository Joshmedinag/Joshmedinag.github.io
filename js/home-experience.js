(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const telemetry = document.querySelector('.hero-telemetry');
  const heroCarousel = document.querySelector('[data-hero-carousel]');
  let telemetryFade;
  const syncTelemetry = (slide, index, animate = false) => {
    if (!telemetry || !slide) return;
    telemetryFade?.cancel();
    telemetry.querySelector('[data-carousel-scene]').textContent = `[SCENE: ${String(index + 1).padStart(2,'0')} // ${slide.dataset.scene}]`;
    telemetry.querySelector('[data-carousel-pipeline]').textContent = `[${slide.dataset.pipeline}]`;
    telemetry.querySelector('[data-carousel-tools]').textContent = `[${slide.dataset.render}]`;
    telemetry.querySelector('[data-carousel-format]').textContent = `[FRAME: ${slide.getAttribute('width')} × ${slide.getAttribute('height')}]`;
    if (animate && !reduceMotion.matches) telemetryFade = telemetry.animate([{opacity:0},{opacity:1}], {duration:200,easing:getComputedStyle(telemetry).getPropertyValue('--spring-snappy').trim()});
  };
  syncTelemetry(heroCarousel?.querySelector('.is-active'),0);
  document.addEventListener('portfolio:slidechange', event => syncTelemetry(event.detail.slide,event.detail.index,event.detail.animate));

  document.querySelectorAll('[data-compare]').forEach(compare => {
    let dragging = false;
    let activePointer;
    let target = 50;
    let current = 50;
    let velocity = 0;
    let animationFrame = 0;
    const finalLabel = compare.querySelector('.compare-label--before');
    const technicalLabel = compare.querySelector('.compare-label--after');
    const paint = value => {
      value = Math.min(96,Math.max(4,value));
      compare.style.setProperty('--compare-position', `${value}%`);
      compare.setAttribute('aria-valuenow', String(Math.round(value)));
      finalLabel.style.opacity = String(Math.min(1,(value - 4) / 46));
      technicalLabel.style.opacity = String(Math.min(1,(96 - value) / 46));
      finalLabel.classList.toggle('is-dominant',value >= 50);
      technicalLabel.classList.toggle('is-dominant',value <= 50);
      compare.setAttribute('aria-valuetext',`${Math.round(value)}% final composite, ${Math.round(100-value)}% ${technicalLabel.textContent.replace(/\[PASS: |\]/g,'').toLowerCase()}`);
    };
    const animate = () => {
      velocity = (velocity + (target - current) * .24) * .68;
      current += velocity;
      paint(current);
      if (Math.abs(target - current) > .02 || Math.abs(velocity) > .02) animationFrame = requestAnimationFrame(animate);
      else { current = target; paint(current); animationFrame = 0; }
    };
    const setPosition = (value, immediate = false) => {
      target = Math.min(96, Math.max(4, value));
      compare.setAttribute('aria-valuenow', String(Math.round(target)));
      if (reduceMotion.matches || immediate) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        velocity = 0;
        current = target;
        paint(current);
        return;
      }
      if (!animationFrame) animationFrame = requestAnimationFrame(animate);
    };
    const fromPointer = event => {
      const rect = compare.getBoundingClientRect();
      setPosition(((event.clientX - rect.left) / rect.width) * 100);
    };
    compare.addEventListener('pointerdown', event => {
      if (dragging || event.button !== 0) return;
      dragging = true;
      activePointer = event.pointerId;
      compare.setPointerCapture(event.pointerId);
      fromPointer(event);
    });
    compare.addEventListener('pointermove', event => { if (dragging && event.pointerId === activePointer) fromPointer(event); });
    compare.addEventListener('pointerup', event => {
      if (event.pointerId !== activePointer) return;
      dragging = false;
      if (compare.hasPointerCapture(event.pointerId)) compare.releasePointerCapture(event.pointerId);
    });
    compare.addEventListener('pointercancel', () => { dragging = false; });
    compare.addEventListener('lostpointercapture', () => { dragging = false; });
    compare.addEventListener('keydown', event => {
      const nextFrom = target;
      const step = event.shiftKey ? 10 : 2;
      if (event.key === 'ArrowLeft') { event.preventDefault(); setPosition(nextFrom - step,true); }
      if (event.key === 'ArrowRight') { event.preventDefault(); setPosition(nextFrom + step,true); }
      if (event.key === 'Home') { event.preventDefault(); setPosition(4,true); }
      if (event.key === 'End') { event.preventDefault(); setPosition(96,true); }
    });
    const presets = compare.parentElement.querySelector('.compare-presets');
    if (presets) {
      presets.hidden = false;
      presets.querySelectorAll('[data-compare-preset]').forEach(button => button.addEventListener('click', () => setPosition(Number(button.dataset.comparePreset),true)));
    }
    paint(current);
  });

  document.querySelectorAll('[data-keyboard-hint]').forEach(hint => { hint.hidden = false; });
  document.querySelectorAll('.project-grid').forEach(projectGrid => {
    const cards = Array.from(projectGrid.querySelectorAll('.project-card'));
    let selected = cards[0];
    const visible = () => cards.filter(card => !card.hidden);
    const sync = () => {
      if (!visible().includes(selected)) selected = visible()[0];
      cards.forEach(card => { card.tabIndex = card === selected && !card.hidden ? 0 : -1; });
    };
    projectGrid.addEventListener('focusin',event => { if (cards.includes(event.target)) { selected = event.target; sync(); } });
    projectGrid.addEventListener('keydown',event => {
      if (event.altKey || event.ctrlKey || event.metaKey || !['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      const available = visible();
      const index = available.indexOf(event.target);
      if (index < 0) return;
      event.preventDefault();
      let next = (index + (event.key === 'ArrowLeft' ? -1 : 1) + available.length) % available.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = available.length - 1;
      selected = available[next]; sync();
      selected.focus({preventScroll:true});
      selected.scrollIntoView({block:'nearest',behavior:'instant'});
    });
    document.addEventListener('portfolio:workchange',sync);
    sync();
  });
  const reelSection = document.querySelector('.reel-section');
  const reelStage = document.querySelector('#reel-stage');
  let reelFrame;
  const theaterToggle = document.querySelector('[data-theater-toggle]');
  theaterToggle?.addEventListener('click', () => {
    const active = !reelSection?.classList.contains('is-darkroom');
    reelSection?.classList.toggle('is-darkroom', active);
    theaterToggle.setAttribute('aria-pressed', String(active));
    theaterToggle.textContent = active ? 'Exit darkroom' : 'Darkroom mode';
  });
  if (reelSection && reelStage) {
    let reelInView = false;
    let reelPlaying = false;
    const observer = new IntersectionObserver(entries => { reelInView = entries[0].intersectionRatio > .32; }, { threshold: [.32] });
    observer.observe(reelSection);

    const initialiseVimeo = ({detail:{stage,frame,player}}) => {
      if (stage !== reelStage) return;
      reelFrame = frame;
      player.on('play', () => { reelPlaying = true; reelSection.classList.add('is-playing'); });
      player.on('pause', () => { reelPlaying = false; reelSection.classList.remove('is-playing'); });
      player.on('ended', () => { reelPlaying = false; reelSection.classList.remove('is-playing'); });
      document.addEventListener('keydown', event => {
        const target = event.target;
        if (!reelInView || reelFrame.hidden  || event.ctrlKey || event.metaKey || event.altKey || target instanceof HTMLElement && (target.isContentEditable || target.closest('input,textarea,select,button,a,[role="slider"],[role="tab"]'))) return;
        const key = event.key.toLowerCase();
        if (key === ' ' || key === 'k') {
          event.preventDefault();
          if (reelPlaying) player.pause().catch(() => {}); else player.play().catch(() => {});
        }
        if (key === 'f') {
          event.preventDefault();
          reelFrame.requestFullscreen?.().catch(() => {});
        }
        if (key === 'j' || key === 'l' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          const amount = key === 'j' || event.key === 'ArrowLeft' ? -5 : 5;
          player.getCurrentTime().then(time => player.setCurrentTime(Math.max(0, time + amount))).catch(() => {});
        }
      });
    };
    document.addEventListener('portfolio:reelready',initialiseVimeo);
  }
})();
