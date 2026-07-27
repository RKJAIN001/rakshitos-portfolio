// RJOS.dock — macOS-style dock with hover magnification
window.RJOS = window.RJOS || {};

RJOS.dock = (() => {
  let dockEl = null;

  function init() {
    dockEl = document.getElementById("dock");
    dockEl.querySelectorAll(".dock-item").forEach((item) => {
      item.addEventListener("click", () => RJOS.wm.open(item.dataset.window));
    });

    dockEl.addEventListener("mousemove", (e) => magnify(e.clientX));
    dockEl.addEventListener("mouseleave", resetMagnify);

    refresh();
  }

  function magnify(cursorX) {
    const items = dockEl.querySelectorAll(".dock-item");
    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const dist = Math.abs(cursorX - center);
      const maxDist = 110;
      const scale = dist < maxDist ? 1 + 0.35 * (1 - dist / maxDist) : 1;
      item.style.transform = `scale(${scale})`;
    });
  }

  function resetMagnify() {
    dockEl.querySelectorAll(".dock-item").forEach((item) => {
      item.style.transform = "scale(1)";
    });
  }

  function refresh(activeId) {
    if (!dockEl) return;
    const open = RJOS.wm.getOpenWindows();
    dockEl.querySelectorAll(".dock-item").forEach((item) => {
      const id = item.dataset.window;
      item.classList.toggle("running", open.has(id));
    });
  }

  return { init, refresh };
})();
