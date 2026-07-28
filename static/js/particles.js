// RJOS.particles — ambient drifting light sparks
window.RJOS = window.RJOS || {};

RJOS.particles = (() => {
  const COLORS = ["#FF6B55", "#14A897", "#7A5CFA", "#FFC64B"];
  const COUNT = 22;

  function init() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const desktop = document.getElementById("desktop");
    for (let i = 0; i < COUNT; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      const size = 2 + Math.random() * 3;
      const duration = 14 + Math.random() * 14;
      const delay = -Math.random() * duration; // negative delay = staggered start, already mid-flight
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${Math.random() * 100}%`;
      p.style.bottom = "0px";
      p.style.background = COLORS[i % COLORS.length];
      p.style.animationDuration = `${duration}s`;
      p.style.animationDelay = `${delay}s`;
      desktop.appendChild(p);
    }
  }

  return { init };
})();