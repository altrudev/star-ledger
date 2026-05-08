export function renderCombatConsole(container, state, handlers = {}) {
  if (!container || !state) return;

  container.className = "sl-combat-console";
  container.innerHTML = `
    <div class="sl-combat-header">
      <div>
        <div class="sl-kicker">COMBAT</div>
        <h2>Round ${state.round}</h2>
      </div>
      <span>${escapeHtml(state.phase)}</span>
    </div>

    <div class="sl-ship-grid">
      ${renderShip(state.attacker, "Attacker")}
      ${renderShip(state.defender, "Defender")}
    </div>

    <section class="sl-combat-section">
      <h3>Boarding State</h3>
      <div class="sl-warning-box">
        Boarding Active: ${state.boardingActive ? "YES" : "NO"}<br/>
        Corridor Combat: ${state.corridorCombat ? "YES" : "NO"}
      </div>
    </section>

    <section class="sl-combat-section">
      <h3>Combat Log</h3>
      <div class="sl-log-list">
        ${(state.logs ?? []).slice(-8).map(renderLog).join("")}
      </div>
    </section>
  `;
}

function renderShip(ship, label) {
  return `
    <article class="sl-ship-card">
      <div class="sl-ship-top">
        <h3>${escapeHtml(ship.name)}</h3>
        <span>${escapeHtml(label)}</span>
      </div>

      ${meter("Hull", ship.hull)}
      ${meter("Morale", ship.morale)}
      ${meter("Heat", ship.heat)}
      ${meter("Reactor Stress", ship.reactorStress)}
      ${meter("Boarding", ship.boardingProgress)}
      ${meter("Decompression", ship.decompression)}

      <div class="sl-subsystems">
        ${Object.entries(ship.subsystems ?? {}).map(([k,v]) =>
          `<div>${escapeHtml(k)} ${v.integrity}%</div>`
        ).join("")}
      </div>
    </article>
  `;
}

function meter(label, value) {
  const pct = Math.max(0, Math.min(100, value ?? 0));
  return `
    <label>
      <span>${escapeHtml(label)}</span>
      <div class="sl-meter"><div style="width:${pct}%"></div></div>
    </label>
  `;
}

function renderLog(log) {
  if (log.system) {
    return `<div class="sl-system-log">${escapeHtml(log.text)}</div>`;
  }

  return `
    <div class="sl-log-entry">
      <strong>${escapeHtml(log.actor)}</strong>
      used ${escapeHtml(log.action)}
      ${log.targetSubsystem ? `against ${escapeHtml(log.targetSubsystem)}` : ""}
    </div>
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
