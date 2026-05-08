import { createSeededRng } from "./rng.js";
import { CREW_CONFLICT_EVENTS } from "../data/crewEventTables.js";
import { calculateCrewMoraleSummary } from "./crewMorale.js";

export function createCrewConflictDirector({ crew = [], playerState = {}, seed = null } = {}) {
  const rng = createSeededRng(seed ?? `${playerState.runSeed ?? "run"}:crew-conflict`);
  let cooldown = 0;

  function maybeGenerate(context = {}) {
    if (cooldown > 0) {
      cooldown -= 1;
      return null;
    }

    const summary = calculateCrewMoraleSummary(crew);
    const chance = Math.min(0.35, 0.04 + summary.averageStress * 0.025 + summary.desertionRisk * 0.06);

    if (rng() > chance) return null;

    const candidates = CREW_CONFLICT_EVENTS.filter(e => (e.minStress ?? 0) <= summary.averageStress);
    const event = weightedPick(candidates.length ? candidates : CREW_CONFLICT_EVENTS, rng);
    cooldown = 2;

    return {
      ...event,
      crewHint: pickCrewHint(crew, event, rng),
      contextTags: context.tags ?? []
    };
  }

  return { maybeGenerate };
}

function pickCrewHint(crew, event, rng) {
  if (!crew.length) return null;
  const member = crew[Math.floor(rng() * crew.length)];
  if (event.tags.includes("void")) return `${member.name} will not meet anyone's eyes.`;
  if (event.tags.includes("trust")) return `${member.name} knows more than they are saying.`;
  return `${member.name} is involved.`;
}

function weightedPick(items, rng) {
  const total = items.reduce((s, i) => s + (i.weight ?? 1), 0);
  let roll = rng() * total;
  for (const item of items) {
    roll -= item.weight ?? 1;
    if (roll <= 0) return item;
  }
  return items[items.length - 1];
}
