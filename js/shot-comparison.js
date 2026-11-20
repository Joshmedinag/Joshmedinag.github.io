(() => {
  'use strict';

  const stage = document.querySelector('[data-shot-stage]');
  const fallback = document.querySelector('[data-shot-fallback]');
  const keyFrame = fallback?.querySelector('[data-shot-key]');
  const controls = document.querySelector('[data-shot-controls]');
  const slider = controls?.querySelector('input[type="range"]');
  if (!stage || !keyFrame || !slider || !CSS.supports('clip-path', 'inset(0 0 0 50%)')) return;

  const presets = [...controls.querySelectorAll('[data-shot-preset]')];

  function paint(finalShare) {
    slider.value = String(finalShare);
    stage.style.setProperty('--final-share', `${finalShare}%`);
    stage.classList.toggle('has-split', finalShare > 0 && finalShare < 100);
    let valueText = `${finalShare}% final composite, ${100 - finalShare}% warm key`;
    if (finalShare === 0) valueText = 'Warm key';
    if (finalShare === 100) valueText = 'Final composite';
    slider.setAttribute('aria-valuetext', valueText);
    presets.forEach(button => {
      button.classList.toggle('is-selected', Number(button.dataset.shotPreset) === finalShare);
    });
  }

  function moveDivider(clientX) {
    const bounds = stage.getBoundingClientRect();
    const percent = (clientX - bounds.left) / bounds.width * 100;
    paint(Math.min(100, Math.max(0, Math.round(percent))));
  }

  slider.addEventListener('input', () => paint(slider.valueAsNumber));
  presets.forEach(button => button.addEventListener('click', () => paint(Number(button.dataset.shotPreset))));

  let pointerId = null;
  let pointerStartX = 0;
  let dragging = false;

  stage.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0 || pointerId !== null) return;
    pointerId = event.pointerId;
    pointerStartX = event.clientX;
    dragging = event.pointerType === 'mouse';
    stage.setPointerCapture(pointerId);
    if (dragging) moveDivider(event.clientX);
  });

  stage.addEventListener('pointermove', event => {
    if (event.pointerId !== pointerId) return;
    if (Math.abs(event.clientX - pointerStartX) > 6) dragging = true;
    if (dragging) moveDivider(event.clientX);
  });

  stage.addEventListener('pointerup', event => {
    if (event.pointerId === pointerId) moveDivider(event.clientX);
  });

  stage.addEventListener('lostpointercapture', () => {
    pointerId = null;
    dragging = false;
  });

  keyFrame.setAttribute('aria-hidden', 'true');
  stage.append(keyFrame);
  fallback.hidden = true;
  stage.classList.add('is-interactive');
  stage.querySelector('img').draggable = false;
  paint(slider.valueAsNumber);
  controls.hidden = false;
})();
