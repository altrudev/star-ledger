export function renderDiscoveryPanel(container, discoveryState, handlers = {}) {
  if (!container) return;

  const discoveries = Object.values(discoveryState.discoveredSites ?? {});
  const chains = Object.values(discoveryState.discoveryChains ?? {});

  container.className = "sl-discovery-panel";
  container.innerHTML = `
    <div class="sl-discovery-header">
      <div>
        <div class="sl-kicker">DISCOVERY</div>
        <h2>Recovered Signals</h2>
      </div>
      <span>${discoveries.length} sites</span>
    </div>

    <section class="sl-discovery-section">
      <h3>Active Discoveries</h3>
      <div class="sl-discovery-grid">
        ${discoveries.map(renderDiscoveryCard).join("")}
      </div>
    </section>

    <section class="sl-discovery-section">
      <h3>Discovery Chains</h3>
      <div class="sl-chain-list">
        ${chains.map(renderChain).join("")}
      </div>
    </section>
  `;

  container.querySelectorAll("[data-discovery]").forEach(card => {
    card.addEventListener("click", () => handlers.onSelectDiscovery?.(card.dataset.discovery));
  });
}

function renderDiscoveryCard(d) {
  return `
    <article class="sl-discovery-card ${d.investigated ? "investigated" : ""}" data-discovery="${escapeHtml(d.id)}">
      <h4>${escapeHtml(d.name)}</h4>
      <p>${escapeHtml(d.text)}</p>
      <div class="sl-tags">${(d.tags ?? []).map(t => `<span>${escapeHtml(t)}</span>`).join("")}</div>
      <div class="sl-risk">Risk ${escapeHtml(d.risk)}</div>
    </article>
  `;
}

function renderChain(chain) {
  return `
    <div class="sl-chain">
      <strong>${escapeHtml(chain.name)}</strong>
      <span>${chain.progress} clues ${chain.completed ? "— complete" : ""}</span>
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
