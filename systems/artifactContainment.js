import { clamp } from "./rng.js";

export function degradeContainment(artifact, amount = 1) {
  return {
    ...artifact,
    containment: clamp((artifact.containment ?? 100) - amount, 0, 100)
  };
}

export function repairContainment(artifact, amount = 1) {
  return {
    ...artifact,
    containment: clamp((artifact.containment ?? 100) + amount, 0, 100)
  };
}

export function evaluateContainmentFailure(artifact) {
  const containment = artifact.containment ?? 100;

  if (containment <= 0) {
    return {
      catastrophic: true,
      event: "containment_breach"
    };
  }

  if (containment <= 25) {
    return {
      catastrophic: false,
      warning: true,
      event: "containment_critical"
    };
  }

  return {
    catastrophic: false,
    warning: false,
    event: null
  };
}
