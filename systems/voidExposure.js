import { clamp } from "./rng.js";

export function createVoidState(existing = {}) {
  return {
    exposure: existing.exposure ?? 0,
    corruption: existing.corruption ?? 0,
    paranoia: existing.paranoia ?? 0,
    realityInstability: existing.realityInstability ?? 0,
    memoryContradictions: existing.memoryContradictions ?? [],
    falseSignals: existing.falseSignals ?? [],
    flags: existing.flags ?? {},
    lastEventIds: existing.lastEventIds ?? []
  };
}

export function applyVoidExposure(voidState, amount = 1, source = "unknown") {
  const next = createVoidState(voidState);
  next.exposure = clamp(next.exposure + amount, 0, 100);
  next.realityInstability = clamp(next.realityInstability + Math.ceil(amount * 0.5), 0, 100);
  next.lastSource = source;
  return next;
}

export function reduceVoidExposure(voidState, amount = 1) {
  const next = createVoidState(voidState);
  next.exposure = clamp(next.exposure - amount, 0, 100);
  next.paranoia = clamp(next.paranoia - Math.ceil(amount * 0.4), 0, 100);
  return next;
}

export function deriveVoidTier(voidState) {
  const score =
    (voidState.exposure ?? 0) +
    (voidState.corruption ?? 0) * 0.8 +
    (voidState.realityInstability ?? 0) * 0.6 +
    (voidState.paranoia ?? 0) * 0.3;

  if (score >= 110) return "rupture";
  if (score >= 75) return "fracture";
  if (score >= 45) return "drift";
  if (score >= 20) return "whisper";
  return "clean";
}
