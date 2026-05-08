export function renderGalaxyStatusPanel(container, galaxyState, handlers = {}) {
  if (!container || !galaxyState) return;

  const sectors = Object.values(galaxyState.sectors ?? {});
  const events = galaxyState.worldEvents ?? [];
  const rumors = galaxyState.rumors ?? [];

  container.className = "sl-galaxy-panel";
  container.innerHTML = `
    <div class="sl-galaxy-header">
      <div>
        <div class="sl-kicker">GALAXY SIMULATION</div>
        <h2>Turn ${galaxyState.turn ?? 0}</h2>
      </div>
      <span>${events.length} active events</span>
    </div>

    <section class="sl-galaxy-section">
      <h3>Sectors</h3>
      <div class="sl-sector-grid">
        ${sectors.map(renderSectorCard).join("")}
      </div>
    </section>

    <section class="sl-galaxy-section">
      <h3>World Events</h3>
      <div class="sl-list">
        ${events.length ? events.map(e => `<div>${escapeHtml(e.title)} — ${escapeHtml(e.sectorId)}</div>`).join("") : "<div>No major event this turn.</div>"}
      </div>
    </section>

    <section class="sl-galaxy-section">
      <h3>Rumors / Intel</h3>
      <div class="sl-list">
        ${rumors.map(r => `<div>${escapeHtml(r.text)}</div>`).join("")}
      </div>
    </section>

    <section class="sl-galaxy-section">
      <h3>Ending Pressure</h3>
      <div class="sl-pressure-grid">
        ${Object.entries(galaxyState.endingPressure ?? {}).map(([k, v]) => `<div><span>${escapeHtml(k)}</span><strong>${v}</strong></div>`).join("")}
      </div>
    </section>
  `;
}

function renderSectorCard(sector) {
  return `
    <article class="sl-sector-card">
      <div class="sl-sector-title">
        <h4>${escapeHtml(sector.name)}</h4>
        <span>${escapeHtml(sector.controller)}</span>
      </div>
      ${metric("Stability", sector.stability)}
      ${metric("Law", sector.law)}
      ${metric("Void", sector.voidPressure)}
      ${metric("Conflict", sector.conflict)}
    </article>
  `;
}

function metric(label, value) {
  const pct = Math.max(0, Math.min(100, value ?? 0));
  return `
    <label>
      <span>${escapeHtml(label)}</span>
      <div class="sl-meter"><div style="width:${pct}%"></div></div>
    </label>
  `;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}
