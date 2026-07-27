// RJOS.menubar — top menu bar: active app name, File/Window menus, clock, stats
window.RJOS = window.RJOS || {};

RJOS.menubar = (() => {
  let anyMenuOpen = false;

  function init() {
    document.querySelectorAll(".menubar-menu > button").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const menu = btn.parentElement;
        const wasOpen = menu.classList.contains("open");
        closeAllMenus();
        if (!wasOpen) openMenu(menu);
      });
      // macOS behavior: once a menu is open, hovering a sibling menu switches to it
      btn.addEventListener("mouseenter", () => {
        if (!anyMenuOpen) return;
        const menu = btn.parentElement;
        if (menu.classList.contains("open")) return;
        closeAllMenus();
        openMenu(menu);
      });
    });
    document.addEventListener("click", closeAllMenus);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAllMenus(); });

    document.querySelectorAll(".menubar-dropdown [data-menu-action]").forEach((item) => {
      item.addEventListener("click", () => {
        const action = item.dataset.menuAction;
        if (action === "close") RJOS.wm.closeActive();
        if (action === "minimize") RJOS.wm.minimizeActive();
        if (action === "zoom") RJOS.wm.zoomActive();
        closeAllMenus();
      });
    });

    setActiveApp(null);
    tickClock();
    setInterval(tickClock, 15000);
  }

  function openMenu(menu) {
    menu.classList.add("open");
    anyMenuOpen = true;
  }

  function closeAllMenus() {
    document.querySelectorAll(".menubar-menu.open").forEach((m) => m.classList.remove("open"));
    anyMenuOpen = false;
  }

  function setActiveApp(id) {
    const nameEl = document.getElementById("menubar-app-name");
    nameEl.textContent = id ? RJOS.APPS[id].title : "Finder";
  }

  function tickClock() {
    const el = document.getElementById("menubar-clock");
    const d = new Date();
    const date = d.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
    const time = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    el.textContent = `${date}  ${time}`;
  }

  async function refreshStats() {
    try {
      const stats = await RJOS.api.getStats();
      RJOS.apps.updateMonitor(stats);
    } catch (e) {
      // Monitor window (if open) will just keep showing its last values
    }
  }

  return { init, setActiveApp, refreshStats };
})();
