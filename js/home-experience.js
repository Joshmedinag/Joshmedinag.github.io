(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-compare]').forEach(compare => {
    let dragging = false;
    let target = 50;
    let current = 50;
    let velocity = 0;
    let animationFrame = 0;
    const paint = value => {
      compare.style.setProperty('--compare-position', `${value}%`);
      compare.setAttribute('aria-valuenow', String(Math.round(value)));
    };
    const animate = () => {
      velocity = (velocity + (target - current) * .24) * .68;
      current += velocity;
      paint(current);
      if (Math.abs(target - current) > .02 || Math.abs(velocity) > .02) animationFrame = requestAnimationFrame(animate);
      else { current = target; paint(current); animationFrame = 0; }
    };
    const setPosition = value => {
      target = Math.min(96, Math.max(4, value));
      compare.setAttribute('aria-valuenow', String(Math.round(target)));
      if (reduceMotion.matches) { current = target; paint(current); return; }
      if (!animationFrame) animationFrame = requestAnimationFrame(animate);
    };
    const fromPointer = event => {
      const rect = compare.getBoundingClientRect();
      setPosition(((event.clientX - rect.left) / rect.width) * 100);
    };
    compare.addEventListener('pointerdown', event => {
      dragging = true;
      compare.setPointerCapture(event.pointerId);
      fromPointer(event);
    });
    compare.addEventListener('pointermove', event => { if (dragging) fromPointer(event); });
    compare.addEventListener('pointerup', event => {
      dragging = false;
      if (compare.hasPointerCapture(event.pointerId)) compare.releasePointerCapture(event.pointerId);
    });
    compare.addEventListener('pointercancel', () => { dragging = false; });
    compare.addEventListener('keydown', event => {
      const nextFrom = target;
      const step = event.shiftKey ? 10 : 2;
      if (event.key === 'ArrowLeft') { event.preventDefault(); setPosition(nextFrom - step); }
      if (event.key === 'ArrowRight') { event.preventDefault(); setPosition(nextFrom + step); }
      if (event.key === 'Home') { event.preventDefault(); setPosition(4); }
      if (event.key === 'End') { event.preventDefault(); setPosition(96); }
    });
  });

  const pipelineTabs = Array.from(document.querySelectorAll('[data-pipeline-tab]'));
  const pipelinePanels = Array.from(document.querySelectorAll('[data-pipeline-panel]'));
  const selectPipelineTab = (name, moveFocus = false) => {
    pipelineTabs.forEach(tab => {
      const active = tab.dataset.pipelineTab === name;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active && moveFocus) tab.focus();
    });
    pipelinePanels.forEach(panel => {
      const active = panel.dataset.pipelinePanel === name;
      panel.hidden = !active;
      panel.classList.toggle('is-active', active);
    });
  };
  pipelineTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectPipelineTab(tab.dataset.pipelineTab));
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === 'ArrowLeft') next = (index - 1 + pipelineTabs.length) % pipelineTabs.length;
      if (event.key === 'ArrowRight') next = (index + 1) % pipelineTabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = pipelineTabs.length - 1;
      selectPipelineTab(pipelineTabs[next].dataset.pipelineTab, true);
    });
  });

  const consoleTabs = Array.from(document.querySelectorAll('[data-console-tab]'));
  const consoleViews = Array.from(document.querySelectorAll('[data-console-view]'));
  consoleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      consoleTabs.forEach(item => item.setAttribute('aria-selected', String(item === tab)));
      consoleViews.forEach(view => { view.hidden = view.dataset.consoleView !== tab.dataset.consoleTab; });
    });
  });
  document.querySelector('[data-copy-code]')?.addEventListener('click', async event => {
    const button = event.currentTarget;
    const source = document.querySelector('[data-code-source]');
    const code = Array.from(source?.querySelectorAll('.code-line') || []).map(line => line.textContent.replace(/^\d+/, '')).join('\n').trim();
    if (await window.portfolioCopy(code,'Code copied')) {
      button.textContent = 'Copied ↗';
      setTimeout(() => { button.textContent = 'Copy code'; },1600);
    }
  });

  const workToolbar = document.querySelector('[data-work-filters]');
  const workCards = Array.from(document.querySelectorAll('.project-card[data-category]'));
  const palette = document.querySelector('[data-command-palette]');
  const commandInput = palette?.querySelector('[data-command-input]');
  const commandResults = palette?.querySelector('[data-command-results]');
  const commandStatus = palette?.querySelector('[data-command-status]');
  const email = window.PORTFOLIO_CONFIG?.email || 'Joshalexmedina@hotmail.com';
  const copyText = (value, message) => window.portfolioCopy(value, message);
  const staticCommands = [
    { title: 'Watch principal showreel', detail: 'Showreel', href: '#showreel', mark: '▶' },
    { title: 'Selected work', detail: 'All projects', href: '#work', mark: 'W' },
    { title: 'Pipeline lab', detail: 'AOVGuard and FarmFlow', href: '#pipeline-lab', mark: 'P' },
    { title: 'About Joshua', detail: 'Lighting + compositing + technical art', href: '#about', mark: 'A' },
    { title: 'Open CV', detail: 'PDF · updated 2026', href: 'assets/documents/Joshua_Medina_Lighting_Artist_CV_2026.pdf', mark: 'CV', external: true },
    { title: 'Copy email address', detail: email, action: 'copy-email', mark: '@' },
    { title: 'Contact', detail: 'Email and professional profiles', href: '#contact', mark: 'C' }
  ];
  const projectCommands = workCards.map((card, index) => ({
    title: card.querySelector('h3')?.textContent.trim() || `Project ${index + 1}`,
    detail: `${card.dataset.category || ''} ${card.querySelector('.card-tools')?.textContent || ''}`.trim(),
    href: card.getAttribute('href'),
    mark: String(index + 1).padStart(2, '0')
  }));
  const commands = [...staticCommands, ...projectCommands];
  let visibleCommands = commands;
  let selectedCommand = 0;
  let returnFocus = null;

  const runCommand = command => {
    if (!command) return;
    if (command.action === 'copy-email') {
      copyText(email, '[COPIED TO CLIPBOARD]').then(copied => {
        if (commandStatus) commandStatus.textContent = copied ? 'Email copied' : 'Copy unavailable';
      });
      return;
    }
    palette?.close();
    if (command.external) window.open(command.href, '_blank', 'noopener,noreferrer');
    else window.location.href = command.href;
  };
  const renderCommands = () => {
    if (!commandResults) return;
    commandResults.replaceChildren();
    if (!visibleCommands.length) {
      const empty = document.createElement('p');
      empty.className = 'command-empty';
      empty.textContent = 'No matching projects or actions.';
      commandInput?.removeAttribute('aria-activedescendant');
      commandResults.append(empty);
      if (commandStatus) commandStatus.textContent = '0 results';
      return;
    }
    selectedCommand = Math.min(selectedCommand, visibleCommands.length - 1);
    visibleCommands.forEach((command, index) => {
      const option = document.createElement('button');
      option.type = 'button';
      option.id = `command-option-${index}`;
      option.tabIndex = -1;
      option.className = `command-option${index === selectedCommand ? ' is-selected' : ''}`;
      option.setAttribute('role', 'option');
      option.setAttribute('aria-selected', String(index === selectedCommand));
      option.innerHTML = `<span>${command.mark}</span><span><strong></strong><small></small></span><span aria-hidden="true">↗</span>`;
      option.querySelector('strong').textContent = command.title;
      option.querySelector('small').textContent = command.detail;
      option.addEventListener('mouseenter', () => {
        selectedCommand = index;
        commandResults.querySelectorAll('.command-option').forEach((item, itemIndex) => {
          const selected = itemIndex === selectedCommand;
          item.classList.toggle('is-selected', selected);
          item.setAttribute('aria-selected', String(selected));
        });
      });
      option.addEventListener('click', () => runCommand(command));
      commandResults.append(option);
    });
    commandInput?.setAttribute('aria-activedescendant', `command-option-${selectedCommand}`);
    commandResults.querySelector('.is-selected')?.scrollIntoView({block:'nearest'});
    if (commandStatus) commandStatus.textContent = `${visibleCommands.length} ${visibleCommands.length === 1 ? 'result' : 'results'}`;
  };
  const openPalette = () => {
    if (!palette || palette.open || typeof palette.showModal !== 'function') return;
    returnFocus = document.activeElement;
    visibleCommands = commands;
    selectedCommand = 0;
    if (commandInput) commandInput.value = '';
    renderCommands();
    palette.showModal();
    commandInput?.setAttribute('aria-expanded','true');
    commandInput?.focus();
  };
  document.querySelectorAll('[data-command-open]').forEach(button => button.addEventListener('click', openPalette));
  document.addEventListener('keydown', event => {
    const target = event.target;
    const editing = target instanceof HTMLElement && (target.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(target.tagName));
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if (palette?.open) palette.close(); else openPalette();
      return;
    }
    if (!palette?.open || editing && target !== commandInput) return;
    if (event.key === 'Escape') { event.preventDefault(); palette.close(); return; }
    if (!visibleCommands.length) return;
    if (event.key === 'ArrowDown') { event.preventDefault(); selectedCommand = (selectedCommand + 1) % visibleCommands.length; renderCommands(); }
    if (event.key === 'ArrowUp') { event.preventDefault(); selectedCommand = (selectedCommand - 1 + visibleCommands.length) % visibleCommands.length; renderCommands(); }
    if (event.key === 'Enter') { event.preventDefault(); runCommand(visibleCommands[selectedCommand]); }
  });
  commandInput?.addEventListener('input', () => {
    const terms = commandInput.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    visibleCommands = commands.filter(command => terms.every(term => `${command.title} ${command.detail}`.toLowerCase().includes(term)));
    selectedCommand = 0;
    renderCommands();
  });
  palette?.addEventListener('click', event => { if (event.target === palette) palette.close(); });
  palette?.querySelector('[data-command-close]')?.addEventListener('click', () => palette.close());
  palette?.addEventListener('close', () => { commandInput?.setAttribute('aria-expanded','false'); if (returnFocus instanceof HTMLElement) returnFocus.focus({preventScroll:true}); });


  const reelSection = document.querySelector('.reel-section');
  const reelFrame = document.querySelector('#reel-stage iframe');
  const theaterToggle = document.querySelector('[data-theater-toggle]');
  theaterToggle?.addEventListener('click', () => {
    const active = !reelSection?.classList.contains('is-darkroom');
    reelSection?.classList.toggle('is-darkroom', active);
    theaterToggle.setAttribute('aria-pressed', String(active));
    theaterToggle.textContent = active ? 'Exit darkroom' : 'Darkroom mode';
  });
  if (reelSection && reelFrame) {
    let reelInView = false;
    let reelPlaying = false;
    const observer = new IntersectionObserver(entries => { reelInView = entries[0].intersectionRatio > .32; }, { threshold: [.32] });
    observer.observe(reelSection);

    const initialiseVimeo = player => {
      player.on('play', () => { reelPlaying = true; reelSection.classList.add('is-playing'); });
      player.on('pause', () => { reelPlaying = false; reelSection.classList.remove('is-playing'); });
      player.on('ended', () => { reelPlaying = false; reelSection.classList.remove('is-playing'); });
      document.addEventListener('keydown', event => {
        const target = event.target;
        if (!reelInView || reelFrame.hidden || palette?.open || target instanceof HTMLElement && (target.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(target.tagName))) return;
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
    const playerObserver = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      playerObserver.disconnect();
      window.portfolioVimeo(reelFrame).then(initialiseVimeo).catch(() => {});
    },{rootMargin:'100px'});
    playerObserver.observe(reelFrame);
  }
})();
