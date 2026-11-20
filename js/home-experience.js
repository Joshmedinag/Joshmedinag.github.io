(() => {
  'use strict';

  const carousel = document.querySelector('[data-hero-carousel]');
  if (carousel) {
    const template = carousel.querySelector('[data-carousel-slides]');
    const slides = [carousel.querySelector('.hero-image'), ...template.content.querySelectorAll('.hero-image')];
    const controls = document.querySelector('.carousel-controls');
    const picks = Array.from(controls.querySelectorAll('[data-carousel-pick]'));
    const caption = document.querySelector('[data-carousel-project]');
    const title = caption.querySelector('[data-carousel-project-title]');
    const role = caption.querySelector('[data-carousel-project-role]');
    const status = document.querySelector('[data-carousel-status]');
    let current = 0;
    let selection = 0;

    const showFrame = async (index) => {
      const request = ++selection;
      if (index === current) return;
      const next = slides[index];
      if (!next.isConnected) carousel.append(next);
      try {
        await next.decode();
      } catch {
        if (request === selection) status.textContent = 'This frame could not load. The full shot is available in Selected work.';
        return;
      }
      if (request !== selection) return;

      slides[current].classList.remove('is-active');
      slides[current].setAttribute('aria-hidden', 'true');
      next.classList.add('is-active');
      next.removeAttribute('aria-hidden');
      current = index;
      picks.forEach((button, i) => button.setAttribute('aria-pressed', String(i === current)));
      caption.href = next.dataset.projectHref;
      title.textContent = next.dataset.projectTitle;
      role.textContent = next.dataset.projectRole;
      status.textContent = `Showing ${next.dataset.projectTitle}`;
    };

    picks.forEach((button, index) => button.addEventListener('click', () => showFrame(index)));
    controls.addEventListener('keydown', event => {
      if (!picks.includes(event.target)) return;
      const index = picks.indexOf(event.target);
      const next = {
        ArrowLeft: (index - 1 + picks.length) % picks.length,
        ArrowRight: (index + 1) % picks.length,
        Home: 0,
        End: picks.length - 1
      }[event.key];
      if (next === undefined) return;
      event.preventDefault();
      picks[next].focus();
      showFrame(next);
    });
    controls.hidden = false;
  }

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
    theaterToggle.textContent = active ? 'Exit theater view' : 'Theater view';
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
