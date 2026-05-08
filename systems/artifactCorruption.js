import { clamp } from "./rng.js";

export function applyArtifactCorruption(artifact, amount = 1) {
  return {
    ...artifact,
    corruptionLoad: clamp((artifact.corruptionLoad ?? 0) + amount, 0, 100),
    containment: clamp((artifact.containment ?? 100) - amount * 2, 0, 100)
  };
}

export function stabilizeArtifact(artifact, amount = 1) {
  return {
    ...artifact,
    corruptionLoad: clamp((artifact.corruptionLoad ?? 0) - amount, 0, 100),
    containment: clamp((artifact.containment ?? 100) + amount * 2, 0, 100)
  };
}

export function evaluateArtifactInstability(artifact) {
  const instability =
    (artifact.instability ?? 0) +
    Math.floor((artifact.corruptionLoad ?? 0) / 10) +
    Math.floor((100 - (artifact.containment ?? 100)) / 15);

  return {
    instability,
    critical: instability >= 12,
    warning: instability >= 7,
    meltdownRisk: instability >= 16
  };
}

export function deriveArtifactMood(artifact) {
  const state = evaluateArtifactInstability(artifact);

  if (state.meltdownRisk) return "catastrophic";
  if (state.critical) return "unstable";
  if (state.warning) return "disturbed";
  return "stable";
}
