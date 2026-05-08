export function renderEncounterCard(container, encounter, onChoose) {
  if (!container) return;

  const options = [...encounter.visibleOptions, ...encounter.hiddenOptions.map(o => `hidden:${o}`)];

  container.classList.add("sl-encounter-card");
  container.innerHTML = `
    <div class="sl-encounter-header">
      <div class="sl-kicker">ENCOUNTER // ${escapeHtml(encounter.phase.toUpperCase())}</div>
      <h2>${escapeHtml(encounter.title)}</h2>
      <div class="sl-tension">Tension ${encounter.tension}/10</div>
    </div>
    <p class="sl-encounter-text">${escapeHtml(encounter.text)}</p>
    ${encounter.crewInterjection ? `<blockquote>${escapeHtml(encounter.crewInterjection.line)}</blockquote>` : ""}
    <div class="sl-encounter-options">
      ${options.map(option => `<button data-option="${escapeHtml(option)}">${formatOption(option)}</button>`).join("")}
    </div>
  `;

  container.querySelectorAll("button[data-option]").forEach(button => {
    button.addEventListener("click", () => onChoose?.(button.dataset.option, encounter));
  });
}

function formatOption(option) {
  const hidden = option.startsWith("hidden:");
  const label = option.replace("hidden:", "").replaceAll("_", " ");
  return `${hidden ? "◆ " : ""}${label.replace(/\b\w/g, c => c.toUpperCase())}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
