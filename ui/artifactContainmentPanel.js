export function renderArtifactContainmentPanel(container, artifacts, handlers = {}) {
  if (!container) return;

  container.className = "sl-artifact-panel";
  container.innerHTML = `
    <div class="sl-artifact-header">
      <div>
        <div class="sl-kicker">ARTIFACTS</div>
        <h2>Containment Bay</h2>
      </div>
      <span>${artifacts.length} stored</span>
    </div>

    <div class="sl-artifact-grid">
      ${artifacts.map(renderArtifactCard).join("")}
    </div>
  `;

  container.querySelectorAll("[data-artifact]").forEach(card => {
    card.addEventListener("click", () => handlers.onSelectArtifact?.(card.dataset.artifact));
  });
}

function renderArtifactCard(artifact) {
  return `
    <article class="sl-artifact-card mood-${escapeHtml(deriveMood(artifact))}" data-artifact="${escapeHtml(artifact.id)}">
      <div class="sl-artifact-top">
        <h3>${escapeHtml(artifact.name)}</h3>
        <span>${escapeHtml(artifact.rarity)}</span>
      </div>

      <div class="sl-bars">
        ${bar("Containment", artifact.containment ?? 100)}
        ${bar("Corruption", artifact.corruptionLoad ?? 0)}
      </div>

      <div class="sl-artifact-tags">
        ${(artifact.tags ?? []).map(t => `<span>${escapeHtml(t)}</span>`).join("")}
      </div>

      ${artifact.awakened ? `<div class="sl-warning">Awakened</div>` : ""}
      ${(artifact.cooldowns && Object.values(artifact.cooldowns).some(v => v > 0))
        ? `<div class="sl-warning">Cooldown Active</div>`
        : ""}
    </article>
  `;
}

function deriveMood(artifact) {
  const corruption = artifact.corruptionLoad ?? 0;
  const containment = artifact.containment ?? 100;

  if (containment <= 20 || corruption >= 70) return "critical";
  if (containment <= 50 || corruption >= 35) return "warning";
  return "stable";
}

function bar(label, value) {
  const pct = Math.max(0, Math.min(100, value));
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
