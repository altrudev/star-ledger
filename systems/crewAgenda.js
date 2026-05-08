import { clamp } from "./rng.js";

export const AGENDA_TYPES = {
  navy_informant: {
    name: "Navy Informant",
    revealTags: ["navy", "inspection", "contraband"],
    betrayalThreshold: { loyaltyBelow: 25, stressAbove: 7 },
    betrayalEvent: "reports_ship_to_navy"
  },
  syndicate_debt: {
    name: "Syndicate Debt",
    revealTags: ["pirate", "smuggler", "black_market"],
    betrayalThreshold: { loyaltyBelow: 20, stressAbove: 6 },
    betrayalEvent: "sells_route_to_syndicate"
  },
  architect_obsessed: {
    name: "Architect Obsessed",
    revealTags: ["architect", "artifact", "xenoarchaeology"],
    betrayalThreshold: { loyaltyBelow: 30, stressAbove: 8 },
    betrayalEvent: "activates_artifact_without_order"
  },
  void_compromised: {
    name: "Void Compromised",
    revealTags: ["void", "psychological"],
    betrayalThreshold: { loyaltyBelow: 40, stressAbove: 8 },
    betrayalEvent: "opens_channel_to_void_signal"
  }
};

export function evaluateAgendaPressure(member, context = {}, rng = Math.random) {
  if (!member.hiddenAgenda) return null;
  const agenda = AGENDA_TYPES[member.hiddenAgenda];
  if (!agenda) return null;

  const matchingTag = (context.tags ?? []).some(tag => agenda.revealTags.includes(tag));
  const revealChance = matchingTag ? 0.25 : 0.03;
  const shouldReveal = !member.agendaRevealed && rng() < revealChance;

  const loyaltyLow = (member.loyalty ?? 50) <= agenda.betrayalThreshold.loyaltyBelow;
  const stressHigh = (member.stress ?? 0) >= agenda.betrayalThreshold.stressAbove;
  const betrayalChance = loyaltyLow && stressHigh ? 0.35 : stressHigh ? 0.08 : 0.01;
  const betrayal = rng() < betrayalChance;

  return {
    crewId: member.id,
    agendaId: member.hiddenAgenda,
    agendaName: agenda.name,
    shouldReveal,
    betrayal,
    betrayalEvent: betrayal ? agenda.betrayalEvent : null,
    pressure: clamp((member.stress ?? 0) + (50 - (member.loyalty ?? 50)) / 10, 0, 15)
  };
}

export function revealAgenda(member) {
  return { ...member, agendaRevealed: true };
}

export function resolveBetrayalConsequence(playerState, betrayalEvent) {
  const next = {
    ...playerState,
    wantedLevel: playerState.wantedLevel ?? 0,
    routeRiskMod: playerState.routeRiskMod ?? 0,
    corruption: playerState.corruption ?? 0,
    flags: { ...(playerState.flags ?? {}) }
  };

  if (betrayalEvent === "reports_ship_to_navy") next.wantedLevel += 1;
  if (betrayalEvent === "sells_route_to_syndicate") next.routeRiskMod += 2;
  if (betrayalEvent === "activates_artifact_without_order") next.flags.unordered_artifact_activation = true;
  if (betrayalEvent === "opens_channel_to_void_signal") next.corruption += 2;

  return next;
}
