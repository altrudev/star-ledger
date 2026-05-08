export function renderVoidOverlay(container, voidState, eventResult = null) {
  if (!container) return;

  const tier = deriveTier(voidState);
  const event = eventResult?.event;

  container.className = `sl-void-overlay tier-${tier}`;
  container.innerHTML = `
    <div class="sl-void-glitch"></div>
    <div class="sl-void-content">
      <div class="sl-kicker">VOID PRESSURE // ${escapeHtml(tier.toUpperCase())}</div>
      ${event ? `
        <h2>${escapeHtml(event.title)}</h2>
        <p>${escapeHtml(event.text)}</p>
      ` : `
        <h2>Signal Clean</h2>
        <p>No contradiction currently detected.</p>
      `}

      <div class="sl-void-metrics">
        ${metric("Exposure", voidState.exposure ?? 0)}
        ${metric("Paranoia", voidState.paranoia ?? 0)}
        ${metric("Reality Instability", voidState.realityInstability ?? 0)}
        ${metric("Corruption", voidState.corruption ?? 0)}
      </div>
    </div>
  `;
}

function deriveTier(voidState) {
  const score = (voidState.exposure ?? 0) + (voidState.realityInstability ?? 0) + (voidState.corruption ?? 0);
  if (score >= 110) return "rupture";
  if (score >= 75) return "fracture";
  if (score >= 45) return "drift";
  if (score >= 20) return "whisper";
  return "clean";
}

function metric(label, value) {
  const pct = Math.max(0, Math.min(100, value));
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
