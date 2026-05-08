export function renderFirstArtifactDiscovery(container, state, handlers = {}) {
  if (!container || !state) return;

  container.className = `sl-first-artifact sl-phase-${state.phase}`;
  container.innerHTML = `
    <div class="sl-artifact-discovery-bg"></div>
    <div class="sl-first-artifact-content">
      <div class="sl-kicker">TRAVEL EVENT</div>
      <h2>${escapeHtml(state.title)}</h2>

      <div class="sl-event-log">
        ${state.log.map(renderLogEntry).join("")}
      </div>

      ${state.phase === "opened" ? renderCofferContents(state) : ""}
      ${state.crewConversation ? renderCrewConversation(state.crewConversation) : ""}
      ${state.rewardsApplied ? renderUnlockNotice(state) : ""}

      <div class="sl-event-options">
        ${state.options.map(option => `
          <button data-choice="${escapeHtml(option.id)}">${escapeHtml(option.label)}</button>
        `).join("")}
      </div>
    </div>
  `;

  container.querySelectorAll("[data-choice]").forEach(button => {
    button.addEventListener("click", () => handlers.onChoice?.(button.dataset.choice, state));
  });
}

function renderLogEntry(entry) {
  return `
    <article class="sl-log-entry sl-log-${escapeHtml(entry.type)}">
      ${entry.header ? `<h3>${escapeHtml(entry.header)}</h3>` : ""}
      <p>${escapeHtml(entry.text)}</p>
    </article>
  `;
}

function renderCofferContents(state) {
  return `
    <section class="sl-coffer-contents">
      <h3>Recovered Contents</h3>
      <div class="sl-recovered-grid">
        <article>
          <div class="sl-kicker">DATA STORAGE</div>
          <h4>${escapeHtml(state.mnemonicWafer.name)}</h4>
          <p>${escapeHtml(state.mnemonicWafer.description)}</p>
          <pre>${escapeHtml(state.mnemonicWafer.recoveredText.join("\n"))}</pre>
        </article>
        <article>
          <div class="sl-kicker">UNKNOWN OBJECT</div>
          <h4>${escapeHtml(state.artifact.name)}</h4>
          <p>${escapeHtml(state.artifact.description)}</p>
        </article>
      </div>
    </section>
  `;
}

function renderCrewConversation(conversation) {
  return `
    <section class="sl-crew-conversation">
      <h3>${escapeHtml(conversation.title)}</h3>
      <p>${escapeHtml(conversation.opening)}</p>
      <div class="sl-dialogue-lines">
        ${conversation.lines.map(line => `
          <blockquote>
            <strong>${escapeHtml(line.speakerName)}</strong>
            ${escapeHtml(line.text)}
          </blockquote>
        `).join("")}
      </div>
    </section>
  `;
}

function renderUnlockNotice(state) {
  return `
    <section class="sl-unlock-notice">
      <div class="sl-kicker">SYSTEM UNLOCKED</div>
      <h3>Artifacts</h3>
      <p>Artifacts may be active relics, passive relics, dormant fragments, or key pieces connected to larger endgame discoveries.</p>
      <p><strong>Acquired:</strong> ${escapeHtml(state.artifact.name)}</p>
    </section>
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
