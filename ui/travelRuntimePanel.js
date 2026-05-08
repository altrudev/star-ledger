export function renderTravelRuntimePanel(container, tickState, handlers = {}) {
  if (!container || !tickState) return;

  const event = tickState.event;
  const isDecision = tickState.kind === "light_decision";
  const isMajor = tickState.kind === "major_event";

  container.className = `sl-travel-runtime sl-phase-${tickState.visual.phase} sl-kind-${tickState.kind}`;
  container.innerHTML = `
    <div class="sl-travel-visual ${tickState.visual.layers.map(l => `layer-${l}`).join(" ")}"
      style="--distortion:${tickState.visual.distortion}; --parallax:${tickState.visual.parallaxSpeed}; --brightness:${tickState.visual.brightness};">
    </div>
    <div class="sl-travel-content">
      <div class="sl-kicker">TRAVEL // ${escapeHtml(tickState.visual.phase.toUpperCase())}</div>
      <div class="sl-route-line"><span>Risk ${tickState.routeState.risk}/10</span><span>Tick ${tickState.tick}/${tickState.tripLength}</span></div>
      <div class="sl-progress"><div class="sl-progress-fill" style="width:${Math.round(tickState.visual.progress * 100)}%"></div></div>
      ${event ? `<section class="sl-travel-event"><h3>${escapeHtml(event.title ?? "Transit Echo")}</h3><p>${escapeHtml(event.text)}</p>${tickState.crewHint ? `<blockquote>${escapeHtml(tickState.crewHint)}</blockquote>` : ""}</section>` : ""}
      ${isDecision ? renderDecisionOptions(event) : ""}
      ${isMajor ? `<button class="sl-major-button" data-major="open">Open Encounter</button>` : ""}
    </div>
  `;

  container.querySelectorAll("[data-choice]").forEach(btn => btn.addEventListener("click", () => handlers.onChoice?.(btn.dataset.choice, tickState)));
  const major = container.querySelector("[data-major='open']");
  if (major) major.addEventListener("click", () => handlers.onMajorEvent?.(tickState));
}

function renderDecisionOptions(event) {
  return `<div class="sl-decision-options">${(event.options ?? []).map(o => `<button data-choice="${escapeHtml(o.id)}">${escapeHtml(o.label)}</button>`).join("")}</div>`;
}

function escapeHtml(value) {
  return String(value ?? "").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
}
