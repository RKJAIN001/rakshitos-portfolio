// RJOS.widgets — ambient desktop widgets (clock + live visits)
window.RJOS = window.RJOS || {};

RJOS.widgets = (() => {
  function init() {
    tick();
    setInterval(tick, 1000);
  }

  function tick() {
    const timeEl = document.getElementById("widget-time");
    const dateEl = document.getElementById("widget-date");
    if (!timeEl) return;
    const d = new Date();
    timeEl.textContent = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    dateEl.textContent = d.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });
  }

  return { init };
})();
