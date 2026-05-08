export function renderCrewStatusPanel(container, crew, handlers = {}) {
  if (!container) return;

  container.className = "sl-crew-panel";
  container.innerHTML = `
    <div class="sl-crew-header">
      <div>
        <div class="sl-kicker">CREW</div>
        <h2>Ship Roster</h2>
      </div>
      <span>${crew.length} aboard</span>
    </div>

    <div class="sl-crew-grid">
      ${crew.map(member => renderCrewCard(member)).join("")}
    </div>
  `;

  container.querySelectorAll("[data-crew]").forEach(card => {
    card.addEventListener("click", () => handlers.onSelectCrew?.(card.dataset.crew));
  });
}

function renderCrewCard(member) {
  const topSkills = Object.entries(member.skills ?? {})
    .sort((a, b) => b[1] - a[1])
    .filter(([, v]) => v > 0)
    .slice(0, 3);

  return `
    <article class="sl-crew-card status-${escapeHtml(member.status ?? "active")}" data-crew="${escapeHtml(member.id)}">
      <div class="sl-crew-name-row">
        <h3>${escapeHtml(member.name)}</h3>
        <span>${escapeHtml(member.role ?? "Crew")}</span>
      </div>

      <div class="sl-bars">
        ${bar("Loyalty", member.loyalty ?? 50, 100)}
        ${bar("Stress", member.stress ?? 0, 10)}
      </div>

      <div class="sl-skill-tags">
        ${topSkills.map(([k, v]) => `<span>${escapeHtml(k)} ${v}</span>`).join("")}
      </div>

      ${member.trauma?.length ? `<div class="sl-warning">Trauma: ${member.trauma.map(escapeHtml).join(", ")}</div>` : ""}
      ${member.injuries?.length ? `<div class="sl-warning">Injured</div>` : ""}
      ${member.hiddenAgenda && !member.agendaRevealed ? `<div class="sl-secret">Unresolved personal history</div>` : ""}
      ${member.agendaRevealed ? `<div class="sl-secret revealed">Agenda revealed: ${escapeHtml(member.hiddenAgenda)}</div>` : ""}
    </article>
  `;
}

function bar(label, value, max) {
  const pct = Math.max(0, Math.min(100, Math.round((value / max) * 100)));
  return `
    <label>
      <span>${escapeHtml(label)}</span>
      <div class="sl-bar"><div style="width:${pct}%"></div></div>
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
