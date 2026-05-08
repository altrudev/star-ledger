import { applyArtifactCorruption } from "./artifactCorruption.js";

export function evaluateArtifactResonance(artifact, context = {}) {
  const tags = context.tags ?? [];
  const matching = artifact.resonanceTriggers?.filter(t => tags.includes(t)) ?? [];

  if (!matching.length) {
    return {
      triggered: false,
      artifact,
      resonanceLevel: 0
    };
  }

  const resonanceLevel = matching.length * 2 + (context.voidPressure ?? 0);

  let next = artifact;
  if (resonanceLevel >= 4) {
    next = applyArtifactCorruption(next, 1);
  }

  return {
    triggered: true,
    artifact: next,
    resonanceLevel,
    matchingTags: matching,
    text: buildResonanceText(artifact, matching)
  };
}

function buildResonanceText(artifact, matching) {
  if (artifact.origin === "void") {
    return `The ${artifact.name} vibrates against unseen frequencies.`;
  }

  if (artifact.origin === "architect") {
    return `The ${artifact.name} aligns with hidden geometry.`;
  }

  return `${artifact.name} reacts to nearby conditions.`;
}
