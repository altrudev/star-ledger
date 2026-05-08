export function renderTravelState(container, travelUiState) {
  if (!container) return;

  container.classList.add("sl-travel-panel");
  container.dataset.background = travelUiState.backgroundId;

  container.innerHTML = `
    <div class="sl-travel-bg ${travelUiState.backgroundLayers.map(l => `layer-${l}`).join(" ")}"></div>
    <div class="sl-travel-hud">
      <div class="sl-kicker">STAR LEDGER // TRANSIT</div>
      <h2>${escapeHtml(travelUiState.title)}</h2>
      <div class="sl-progress">
        <div class="sl-progress-fill" style="width:${Math.round(travelUiState.progress * 100)}%"></div>
      </div>
      <div class="sl-risk sl-risk-${travelUiState.dangerLabel.toLowerCase()}">
        Route Risk: ${escapeHtml(travelUiState.dangerLabel)}
      </div>
      <div class="sl-tags">
        ${travelUiState.tags.map(t => `<span>${escapeHtml(t)}</span>`).join("")}
      </div>
    </div>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
