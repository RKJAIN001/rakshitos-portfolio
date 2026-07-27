// RJOS.apps — renders content into each window from the /api/profile payload
window.RJOS = window.RJOS || {};

RJOS.apps = (() => {
  let data = null;

  async function load() {
    try {
      data = await RJOS.api.getProfile();
    } catch (e) {
      console.error("Failed to load profile", e);
      data = null;
    }
    return data;
  }

  function populate(id, el) {
    if (!data) return;
    const { profile, experience, projects, skills, education, achievements, leadership } = data;

    if (id === "about") {
      el.querySelector("#about-name").textContent = profile.name;
      el.querySelector("#about-tagline").textContent = `${profile.tagline}  ·  ${profile.location}`;
      el.querySelector("#about-summary").textContent = profile.summary;
      el.querySelector("#about-stats").innerHTML = profile.stats.map(s => `
        <div class="stat-card"><div class="stat-num">${s.value}</div><div class="stat-label">${s.label}</div></div>
      `).join("");
    }

    if (id === "experience") {
      el.querySelector("#experience-list").innerHTML = experience.map(e => `
        <div class="tl-item">
          <div class="tl-dot"></div>
          <div class="tl-top">
            <div><span class="tl-role">${e.role}</span> · <span class="tl-org">${e.org}</span></div>
            <div class="tl-date mono">${e.date}</div>
          </div>
          <ul class="tl-list">${e.points.map(p => `<li>${p}</li>`).join("")}</ul>
        </div>
      `).join("");
    }

    if (id === "projects") {
      el.querySelector("#projects-list").innerHTML = projects.map(p => `
        <div class="proj-card">
          <div class="proj-sub mono">${p.subtitle}</div>
          <div class="proj-name">${p.name}</div>
          <div class="proj-desc">${p.description}</div>
          <div class="proj-tags">${p.tags.map(t => `<span class="proj-tag">${t}</span>`).join("")}</div>
          <div class="proj-links">
            ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener">GitHub</a>` : ""}
            ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener">Live demo</a>` : ""}
          </div>
        </div>
      `).join("");
    }

    if (id === "skills") {
      el.querySelector("#skills-list").innerHTML = skills.map(g => `
        <div>
          <div class="skill-cat mono">${g.category}</div>
          <div class="chip-set">${g.items.map(i => `<span class="chip">${i}</span>`).join("")}</div>
        </div>
      `).join("");
    }

    if (id === "education") {
      el.querySelector("#education-list").innerHTML = education.map(e => `
        <div class="edu-item">
          <div class="edu-degree">${e.degree}</div>
          <div class="edu-meta">${e.school} · ${e.date}${e.detail ? " · " + e.detail : ""}</div>
        </div>
      `).join("");
      el.querySelector("#leadership-block").innerHTML = `
        <strong>${leadership.role}</strong> · ${leadership.date}<br>${leadership.detail}
      `;
      el.querySelector("#achievements-list").innerHTML = achievements.map(a => `<li>${a}</li>`).join("");
    }

    if (id === "contact") {
      el.querySelector("#contact-direct").innerHTML = `
        <a href="mailto:${profile.email}">${profile.email}</a>
        <a href="tel:${profile.phone}">${profile.phone}</a>
        <a href="${profile.linkedin}" target="_blank" rel="noopener">LinkedIn ↗</a>
      `;
      const form = el.querySelector("#contact-form");
      const status = el.querySelector("#contact-status");
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const payload = Object.fromEntries(new FormData(form).entries());
        status.textContent = "sending…";
        status.className = "contact-status";
        try {
          const json = await RJOS.api.postContact(payload);
          status.textContent = json.detail;
          status.className = "contact-status ok";
          form.reset();
          RJOS.menubar.refreshStats();
        } catch (err) {
          status.textContent = "couldn't send — is the backend running?";
          status.className = "contact-status err";
        }
      });
    }

    if (id === "terminal") {
      const output = el.querySelector("#term-output");
      const input = el.querySelector("#term-input");
      input.focus();
      input.addEventListener("keydown", async (e) => {
        if (e.key !== "Enter") return;
        const cmd = input.value;
        output.textContent += `\nrakshit@portfolio:~$ ${cmd}\n`;
        input.value = "";
        try {
          const json = await RJOS.api.postTerminal(cmd);
          if (json.output === "__CLEAR__") {
            output.textContent = "";
          } else {
            output.textContent += json.output + "\n";
          }
        } catch (err) {
          output.textContent += "error: backend unreachable\n";
        }
        output.scrollTop = output.scrollHeight;
      });
    }

    if (id === "monitor") {
      RJOS.menubar.refreshStats();
    }
  }

  function updateMonitor(stats) {
    const mv = document.getElementById("mon-visits");
    if (!mv) return; // monitor window not open
    document.getElementById("mon-visits").textContent = stats.visits;
    document.getElementById("mon-messages").textContent = stats.messages;
    const m = Math.floor(stats.uptime_seconds / 60), s = stats.uptime_seconds % 60;
    document.getElementById("mon-uptime").textContent = `${m}m ${s}s`;
    document.getElementById("mon-time").textContent = stats.server_time.replace("T", " ").slice(0, 19);
  }

  return { load, populate, updateMonitor };
})();
