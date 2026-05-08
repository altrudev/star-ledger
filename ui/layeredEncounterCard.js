export function renderLayeredEncounter(container, encounterState, handlers = {}) {
  if (!container || !encounterState) return;

  container.className = `sl-layered-encounter sl-phase-${encounterState.phase} sl-faction-${encounterState.faction}`;
  container.innerHTML = `
    <div class="sl-encounter-top">
      <div>
        <div class="sl-kicker">ENCOUNTER // ${escapeHtml(encounterState.phase.toUpperCase())}</div>
        <h2>${escapeHtml(encounterState.title)}</h2>
      </div>
      <div class="sl-tension">
        <span>Tension</span>
        <strong>${encounterState.tension}/10</strong>
      </div>
    </div>

    <div class="sl-phase-track">
      ${["intro","negotiation","escalation","aftermath"].map(p => `<span class="${p === encounterState.phase ? "active" : ""}">${p}</span>`).join("")}
    </div>

    <div class="sl-encounter-log">
      ${encounterState.log.map(entry => renderLogEntry(entry)).join("")}
    </div>

    ${encounterState.resolved ? renderOutcome(encounterState.outcome) : renderOptions(encounterState.options)}
  `;

  container.querySelectorAll("[data-option]").forEach(btn => {
    btn.addEventListener("click", () => handlers.onChoice?.(btn.dataset.option, encounterState));
  });
}

function renderLogEntry(entry) {
  const klass = `sl-log-entry sl-log-${entry.type}`;
  return `<div class="${klass}">${escapeHtml(entry.text)}</div>`;
}

function renderOptions(options) {
  return `
    <div class="sl-encounter-options">
      ${options.map(option => `
        <button data-option="${escapeHtml(option.id)}" class="${option.kind === "crew" ? "crew-option" : ""}">
          ${option.kind === "crew" ? "◆ " : ""}${escapeHtml(option.label)}
          ${option.check ? `<small>${escapeHtml(option.check.skill ?? option.check.shipStat)} DC ${option.check.dc}</small>` : ""}
        </button>
      `).join("")}
    </div>
  `;
}

function renderOutcome(outcome) {
  return `
    <div class="sl-encounter-outcome">
      <div class="sl-kicker">OUTCOME</div>
      <p>${escapeHtml(outcome?.text ?? "Resolved.")}</p>
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
