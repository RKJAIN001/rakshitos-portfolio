// RJOS.main — boots the OS
window.RJOS = window.RJOS || {};

window.addEventListener("DOMContentLoaded", async () => {
  await RJOS.apps.load();

  RJOS.menubar.init();
  RJOS.dock.init();
  RJOS.widgets.init();
  RJOS.particles.init();

  const boot = document.getElementById("boot");
  const desktop = document.getElementById("desktop");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const delay = reduceMotion ? 50 : 1500;

  setTimeout(() => {
    boot.style.display = "none";
    desktop.hidden = false;
    RJOS.wm.open("about");
    RJOS.menubar.refreshStats();
  }, delay);
});