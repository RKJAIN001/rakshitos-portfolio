// RJOS.wm — window manager for the desktop
window.RJOS = window.RJOS || {};

RJOS.APPS = {
  about:      { title: "About",       color: "var(--coral)"  },
  experience: { title: "Experience",  color: "var(--teal)"   },
  projects:   { title: "Projects",    color: "var(--purple)" },
  skills:     { title: "Skills",      color: "var(--yellow)" },
  education:  { title: "Education",   color: "var(--ink)"    },
  contact:    { title: "Contact",     color: "var(--coral)"  },
  terminal:   { title: "Terminal",    color: "#1B2340"       },
  monitor:    { title: "Monitor",     color: "var(--teal)"   },
};

RJOS.wm = (() => {
  const windows = new Map(); // id -> { el, minimized, maximized, prevRect }
  let zTop = 100;
  let activeId = null;

  function open(id) {
    if (windows.has(id)) {
      const w = windows.get(id);
      if (w.minimized) restore(id);
      focus(id);
      return;
    }

    const meta = RJOS.APPS[id];
    const layer = document.getElementById("windows-layer");
    const el = document.createElement("div");
    el.className = "win";
    el.dataset.winId = id;

    const offset = windows.size * 26;
    el.style.left = `${120 + offset}px`;
    el.style.top = `${70 + offset}px`;
    el.style.width = id === "terminal" ? "480px" : "440px";
    el.style.height = id === "terminal" ? "360px" : "460px";

    el.innerHTML = `
      <div class="win-titlebar" data-drag-handle>
        <div class="traffic-lights">
          <button class="tl-btn red" data-action="close" aria-label="Close">
            <svg viewBox="0 0 8 8"><path d="M1 1L7 7M7 1L1 7" stroke="#4d0000" stroke-width="1.2" stroke-linecap="round"/></svg>
          </button>
          <button class="tl-btn yellow" data-action="minimize" aria-label="Minimize">
            <svg viewBox="0 0 8 8"><path d="M1 4H7" stroke="#5c4400" stroke-width="1.2" stroke-linecap="round"/></svg>
          </button>
          <button class="tl-btn green" data-action="maximize" aria-label="Zoom">
            <svg viewBox="0 0 8 8"><path d="M1.5 5.5L5.5 1.5M1.5 1.5H5.5V5.5" stroke="#003d00" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
        <div class="win-title">${meta.title}</div>
      </div>
    `;

    const bodyWrap = document.createElement("div");
    bodyWrap.style.flex = "1";
    bodyWrap.style.overflow = "hidden";
    bodyWrap.style.display = "flex";
    bodyWrap.style.flexDirection = "column";
    const tpl = document.getElementById(`tpl-${id}`);
    bodyWrap.appendChild(tpl.content.cloneNode(true));
    el.appendChild(bodyWrap);

    const resizeHandle = document.createElement("div");
    resizeHandle.className = "win-resize-handle";
    el.appendChild(resizeHandle);

    layer.appendChild(el);
    windows.set(id, { el, minimized: false, maximized: false, prevRect: null });

    el.querySelector('[data-action="close"]').addEventListener("click", () => close(id));
    el.querySelector('[data-action="minimize"]').addEventListener("click", () => minimize(id));
    el.querySelector('[data-action="maximize"]').addEventListener("click", () => toggleMaximize(id));
    el.querySelector(".win-titlebar").addEventListener("dblclick", (e) => {
      if (!e.target.closest(".tl-btn")) toggleMaximize(id);
    });
    el.addEventListener("mousedown", () => focus(id));

    makeDraggable(el, el.querySelector("[data-drag-handle]"), id);
    makeResizable(el, resizeHandle);

    if (RJOS.apps && RJOS.apps.populate) RJOS.apps.populate(id, el);
    focus(id);
    if (RJOS.dock) RJOS.dock.refresh();
  }

  function close(id) {
    const w = windows.get(id);
    if (!w) return;
    w.el.remove();
    windows.delete(id);
    if (activeId === id) activeId = null;
    if (RJOS.dock) RJOS.dock.refresh();
    if (RJOS.menubar) RJOS.menubar.setActiveApp(getTopWindowId());
  }

  function minimize(id) {
    const w = windows.get(id);
    if (!w) return;
    w.minimized = true;
    w.el.classList.add("minimized");
    if (RJOS.dock) RJOS.dock.refresh();
    if (activeId === id) RJOS.menubar && RJOS.menubar.setActiveApp(getTopWindowId());
  }

  function restore(id) {
    const w = windows.get(id);
    if (!w) return;
    w.minimized = false;
    w.el.classList.remove("minimized");
    focus(id);
  }

  function toggleMaximize(id) {
    const w = windows.get(id);
    if (!w) return;
    const desktop = document.getElementById("desktop").getBoundingClientRect();
    if (!w.maximized) {
      w.prevRect = {
        left: w.el.style.left, top: w.el.style.top,
        width: w.el.style.width, height: w.el.style.height,
      };
      w.el.style.left = "0px";
      w.el.style.top = `var(--menubar-h)`;
      w.el.style.top = "28px";
      w.el.style.width = `${desktop.width}px`;
      w.el.style.height = `${desktop.height - 28}px`;
      w.el.classList.add("maximized");
      w.maximized = true;
    } else {
      if (w.prevRect) {
        w.el.style.left = w.prevRect.left;
        w.el.style.top = w.prevRect.top;
        w.el.style.width = w.prevRect.width;
        w.el.style.height = w.prevRect.height;
      }
      w.el.classList.remove("maximized");
      w.maximized = false;
    }
    focus(id);
  }

  function focus(id) {
    const w = windows.get(id);
    if (!w) return;
    zTop += 1;
    w.el.style.zIndex = zTop;
    activeId = id;
    if (RJOS.dock) RJOS.dock.refresh(id);
    if (RJOS.menubar) RJOS.menubar.setActiveApp(id);
  }

  function getTopWindowId() {
    let top = null, topZ = -1;
    windows.forEach((w, id) => {
      if (!w.minimized) {
        const z = parseInt(w.el.style.zIndex || "0", 10);
        if (z > topZ) { topZ = z; top = id; }
      }
    });
    return top;
  }

  function closeActive() { if (activeId) close(activeId); }
  function minimizeActive() { if (activeId) minimize(activeId); }
  function zoomActive() { if (activeId) toggleMaximize(activeId); }

  function makeDraggable(win, handle, id) {
    let dragging = false, offX = 0, offY = 0;
    const start = (x, y) => {
      const w = windows.get(id);
      if (w && w.maximized) return;
      dragging = true;
      const rect = win.getBoundingClientRect();
      offX = x - rect.left; offY = y - rect.top;
    };
    const move = (x, y) => {
      if (!dragging) return;
      const desktopRect = document.getElementById("desktop").getBoundingClientRect();
      let left = Math.max(0, Math.min(x - offX, desktopRect.width - 100));
      let top = Math.max(28, Math.min(y - offY, desktopRect.height - 60));
      win.style.left = `${left}px`;
      win.style.top = `${top}px`;
    };
    const end = () => { dragging = false; };

    handle.addEventListener("mousedown", (e) => { start(e.clientX, e.clientY); e.preventDefault(); });
    window.addEventListener("mousemove", (e) => move(e.clientX, e.clientY));
    window.addEventListener("mouseup", end);
    handle.addEventListener("touchstart", (e) => { const t = e.touches[0]; start(t.clientX, t.clientY); }, { passive: true });
    window.addEventListener("touchmove", (e) => { const t = e.touches[0]; move(t.clientX, t.clientY); }, { passive: true });
    window.addEventListener("touchend", end);
  }

  function makeResizable(win, handle) {
    let resizing = false, startX = 0, startY = 0, startW = 0, startH = 0;
    handle.addEventListener("mousedown", (e) => {
      resizing = true; startX = e.clientX; startY = e.clientY;
      const rect = win.getBoundingClientRect();
      startW = rect.width; startH = rect.height;
      e.preventDefault(); e.stopPropagation();
    });
    window.addEventListener("mousemove", (e) => {
      if (!resizing) return;
      win.style.width = `${Math.max(340, startW + (e.clientX - startX))}px`;
      win.style.height = `${Math.max(220, startH + (e.clientY - startY))}px`;
    });
    window.addEventListener("mouseup", () => { resizing = false; });
  }

  return {
    open, close, minimize, restore, toggleMaximize, focus,
    closeActive, minimizeActive, zoomActive,
    getOpenWindows: () => windows,
    getActiveId: () => activeId,
  };
})();
