// Antigravity-style floating effect (no cursor/ring)
// Inspired by https://antigravity.google/

(function () {
  const config = {
    floatAmount: 6,
    floatSpeed: 0.003,
  };

  let time = 0;

  function animate(timestamp) {
    time = timestamp / 1000;
    document.querySelectorAll('[data-ag-float]').forEach((el) => {
      const amplitude = parseFloat(el.getAttribute('data-ag-float')) || config.floatAmount;
      const speed = parseFloat(el.getAttribute('data-ag-speed')) || config.floatSpeed;
      const x = Math.sin(time * 2.3 * speed) * amplitude;
      const y = Math.cos(time * 1.8 * speed) * amplitude;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
})();
