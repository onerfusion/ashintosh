// Antigravity-style cursor + float effect
// Inspired by https://antigravity.google/

(function () {
  const config = {
    cursorSize: 18,
    ringSize: 48,
    ringThickness: 2,
    ringFade: 0.25,
    attraction: 0.15,
    drag: 0.85,
    floatAmount: 6,
    floatSpeed: 0.003,
  };

  const state = {
    mouseX: window.innerWidth / 2,
    mouseY: window.innerHeight / 2,
    cursorX: window.innerWidth / 2,
    cursorY: window.innerHeight / 2,
    ringX: window.innerWidth / 2,
    ringY: window.innerHeight / 2,
    ringOpacity: 0,
    time: 0,
  };

  const cursor = document.createElement('div');
  const ring = document.createElement('div');
  cursor.className = 'ag-cursor';
  ring.className = 'ag-ring';
  document.body.append(cursor, ring);

  function onMove(e) {
    state.mouseX = e.clientX;
    state.mouseY = e.clientY;
    state.ringOpacity = 1;
  }

  function onLeave() {
    state.ringOpacity = 0;
  }

  window.addEventListener('mousemove', onMove, { passive: true });
  window.addEventListener('mouseleave', onLeave, { passive: true });

  function tick(timestamp) {
    state.time = timestamp / 1000;

    // Cursor follows instantly
    state.cursorX = state.mouseX;
    state.cursorY = state.mouseY;

    // Ring lags behind for smoothness
    state.ringX += (state.mouseX - state.ringX) * config.attraction;
    state.ringY += (state.mouseY - state.ringY) * config.attraction;

    const ringOpacity = Math.max(0, Math.min(1, state.ringOpacity));

    cursor.style.transform = `translate3d(${state.cursorX}px, ${state.cursorY}px, 0)`;
    ring.style.transform = `translate3d(${state.ringX}px, ${state.ringY}px, 0)`;
    ring.style.opacity = ringOpacity;

    // Animate floats on elements
    document.querySelectorAll('[data-ag-float]').forEach((el) => {
      const amplitude = parseFloat(el.getAttribute('data-ag-float')) || config.floatAmount;
      const speed = parseFloat(el.getAttribute('data-ag-speed')) || config.floatSpeed;
      const x = Math.sin(state.time * 2.3 * speed) * amplitude;
      const y = Math.cos(state.time * 1.8 * speed) * amplitude;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();
