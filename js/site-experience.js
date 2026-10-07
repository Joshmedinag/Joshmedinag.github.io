(() => {
  'use strict';

  const header = document.querySelector('.site-header');
  const updateAnchorOffset = () => {
    if (header) document.documentElement.style.setProperty('--anchor-offset', `${Math.ceil(header.offsetTop + header.offsetHeight + 16)}px`);
  };
  updateAnchorOffset();
  if (header && 'ResizeObserver' in window) new ResizeObserver(updateAnchorOffset).observe(header);
  window.addEventListener('resize', updateAnchorOffset, { passive: true });
  const updateHeader = () => header?.classList.toggle('is-compact', window.scrollY > 44);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const navigation = document.querySelector('.navigation');
  const navLinks = Array.from(navigation?.querySelectorAll('a') || []);
  const activeNav = () => navLinks.find(link => link.classList.contains('active')) || navLinks[0];
  const positionIndicator = link => {
    if (!navigation || !link || innerWidth <= 1050) return;
    const navRect = navigation.getBoundingClientRect();
    const rect = link.getBoundingClientRect();
    navigation.style.setProperty('--nav-left', `${rect.left - navRect.left}px`);
    navigation.style.setProperty('--nav-width', `${rect.width}px`);
    navigation.style.setProperty('--nav-opacity', '1');
  };
  document.fonts.ready.then(() => positionIndicator(activeNav()));
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => positionIndicator(link));
    link.addEventListener('focus', () => positionIndicator(link));
  });
  navigation?.addEventListener('mouseleave', () => positionIndicator(activeNav()));
  navigation?.addEventListener('focusout', () => requestAnimationFrame(() => {
    if (!navigation.contains(document.activeElement)) positionIndicator(activeNav());
  }));
  window.addEventListener('resize', () => positionIndicator(activeNav()), { passive: true });
  if (navigation) new MutationObserver(() => positionIndicator(activeNav())).observe(navigation, { attributes: true, subtree: true, attributeFilter: ['class'] });

  let toastTimer;
  const toast = document.querySelector('[data-copy-toast]');
  const notify = message => {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 2600);
  };
  window.portfolioCopy = async (value, message = 'Email copied') => {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(value);
      notify(message);
      return true;
    } catch {
      notify('Copy unavailable. Select the text and copy it manually.');
      return false;
    }
  };
  document.querySelectorAll('[data-copy-email]').forEach(button => button.addEventListener('click', () => {
    window.portfolioCopy(button.dataset.email || window.PORTFOLIO_CONFIG?.email || 'Joshalexmedina@hotmail.com');
  }));

  const imageLinks = Array.from(document.querySelectorAll('.project-main .image-detail-link'));
  const links = imageLinks.filter((link,index) => imageLinks.findIndex(item => item.href === link.href) === index);
  if (!links.length || typeof HTMLDialogElement === 'undefined') return;
  const dialog = document.createElement('dialog');
  dialog.className = 'gallery-viewer';
  dialog.setAttribute('aria-label', 'Project image gallery');
  dialog.innerHTML = `<div class="viewer-toolbar"><p data-viewer-count aria-live="polite"></p><button type="button" data-viewer-close aria-label="Close image gallery">Close ×</button></div>
    <div class="viewer-image-stage"><img data-viewer-image alt=""><p class="viewer-error" data-viewer-error hidden>We couldn't load this image. You can still open the original below.</p></div>
    <div class="viewer-caption"><div><h2 data-viewer-title></h2><p data-viewer-description></p><a data-viewer-original target="_blank" rel="noopener noreferrer">Open original ↗<span class="sr-only"> (opens in a new tab)</span></a></div><div class="viewer-navigation"><button type="button" data-viewer-previous aria-label="Previous image">←</button><button type="button" data-viewer-next aria-label="Next image">→</button></div></div>`;
  document.body.append(dialog);
  dialog.querySelector('.viewer-navigation').hidden = links.length < 2;
  const viewerImage = dialog.querySelector('[data-viewer-image]');
  const viewerError = dialog.querySelector('[data-viewer-error]');
  let current = 0;
  let returnFocus;
  let originalOverflow;
  const showImage = index => {
    current = (index + links.length) % links.length;
    const link = links[current];
    const img = link.querySelector('img');
    const figure = link.closest('figure');
    const caption = figure?.querySelector('figcaption');
    const title = caption?.querySelector('h2,h3')?.textContent || img.alt;
    const description = caption?.querySelector('p')?.textContent || (!caption?.querySelector('h2,h3') ? caption?.textContent : '') || '';
    dialog.querySelector('[data-viewer-title]').textContent = title;
    dialog.querySelector('[data-viewer-description]').textContent = description;
    dialog.querySelector('[data-viewer-count]').textContent = `${String(current + 1).padStart(2,'0')} / ${String(links.length).padStart(2,'0')}`;
    dialog.querySelector('[data-viewer-original]').href = link.href;
    viewerError.hidden = true;
    viewerImage.hidden = false;
    viewerImage.alt = img.alt;
    viewerImage.src = link.href;
  };
  viewerImage.addEventListener('error', () => { viewerImage.hidden = true; viewerError.hidden = false; });
  imageLinks.forEach(link => {
    const index = links.findIndex(item => item.href === link.href);
    // Real image URLs remain usable with JavaScript disabled or a modified click.
    link.setAttribute('aria-label', `View ${link.querySelector('img').alt} in image gallery`);
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      returnFocus = link;
      originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      showImage(index);
      dialog.showModal();
    });
  });
  dialog.querySelector('[data-viewer-close]').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-viewer-previous]').addEventListener('click', () => showImage(current - 1));
  dialog.querySelector('[data-viewer-next]').addEventListener('click', () => showImage(current + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showImage(current + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = originalOverflow || '';
    returnFocus?.focus({ preventScroll: true });
  });
})();
