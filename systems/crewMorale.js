import { clamp } from "./rng.js";
import { updateCrewMember } from "./crewState.js";

export function applyCrewMoraleEffect(crew, crewId, effect = {}) {
  return updateCrewMember(crew, crewId, member => applyEffectToMember(member, effect));
}

export function applyCrewWideEffect(crew, effect = {}) {
  return crew.map(member => applyEffectToMember(member, effect));
}

export function applyEffectToMember(member, effect = {}) {
  const next = { ...member };

  if (effect.stress) next.stress = clamp((next.stress ?? 0) + effect.stress, 0, 10);
  if (effect.loyalty) next.loyalty = clamp((next.loyalty ?? 50) + effect.loyalty, 0, 100);

  if (effect.trauma && !next.trauma.includes(effect.trauma)) {
    next.trauma = [...next.trauma, effect.trauma];
  }

  if (effect.injury) {
    next.injuries = [...(next.injuries ?? []), effect.injury];
  }

  next.status = deriveCrewStatus(next);
  return next;
}

export function deriveCrewStatus(member) {
  if ((member.loyalty ?? 50) <= 5) return "desertion_risk";
  if ((member.stress ?? 0) >= 9) return "breaking";
  if (member.injuries?.some(i => i.severity === "critical")) return "incapacitated";
  return member.status === "incapacitated" ? "active" : (member.status ?? "active");
}

export function calculateCrewMoraleSummary(crew) {
  if (!crew.length) return { averageLoyalty: 0, averageStress: 0, breakingCount: 0, desertionRisk: 0 };

  const averageLoyalty = Math.round(crew.reduce((s, c) => s + (c.loyalty ?? 50), 0) / crew.length);
  const averageStress = Math.round(crew.reduce((s, c) => s + (c.stress ?? 0), 0) / crew.length);
  const breakingCount = crew.filter(c => (c.stress ?? 0) >= 8).length;
  const desertionRisk = crew.filter(c => (c.loyalty ?? 50) <= 15).length;

  return { averageLoyalty, averageStress, breakingCount, desertionRisk };
}

export function decayStressAfterSafePort(crew, amount = 2) {
  return crew.map(member => ({
    ...member,
    stress: clamp((member.stress ?? 0) - amount, 0, 10)
  }));
}
