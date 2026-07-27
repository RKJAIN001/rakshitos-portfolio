// RJOS.api — thin wrappers around the FastAPI backend
window.RJOS = window.RJOS || {};

RJOS.api = {
  base: "", // same-origin — FastAPI serves the frontend too

  async getProfile() {
    const res = await fetch(`${RJOS.api.base}/api/profile`);
    if (!res.ok) throw new Error("profile fetch failed");
    return res.json();
  },

  async getStats() {
    const res = await fetch(`${RJOS.api.base}/api/stats`);
    if (!res.ok) throw new Error("stats fetch failed");
    return res.json();
  },

  async postContact(data) {
    const res = await fetch(`${RJOS.api.base}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("contact post failed");
    return res.json();
  },

  async postTerminal(command) {
    const res = await fetch(`${RJOS.api.base}/api/terminal`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ command }),
    });
    if (!res.ok) throw new Error("terminal post failed");
    return res.json();
  },
};
