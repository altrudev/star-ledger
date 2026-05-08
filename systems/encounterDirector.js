import { createSeededRng } from "./rng.js";
import { ENCOUNTER_TABLES } from "../data/encounterTables.js";

export function createEncounterDirector({ playerState = {}, galaxyState = {}, crew = [], ship = {} } = {}) {
  function generateTravelEncounter(travelResult) {
    const rng = createSeededRng(travelResult.encounterSeed ?? "encounter");
    const riskScore = travelResult.risk?.score ?? 0;
    const backgroundTags = travelResult.background?.tags ?? [];

    const candidates = ENCOUNTER_TABLES.travel.filter(e => {
      if ((e.minDanger ?? 0) > riskScore) return false;
      if (e.tags.includes("void") && !backgroundTags.includes("void") && rng() > 0.25) return false;
      return true;
    });

    const encounter = weightedPick(candidates, rng);
    return instantiateEncounter(encounter, { rng, riskScore, backgroundTags, playerState, galaxyState, crew, ship });
  }

  return { generateTravelEncounter };
}

function weightedPick(items, rng) {
  const total = items.reduce((sum, item) => sum + (item.weight ?? 1), 0);
  let roll = rng() * total;
  for (const item of items) {
    roll -= item.weight ?? 1;
    if (roll <= 0) return item;
  }
  return items[items.length - 1];
}

function instantiateEncounter(template, context) {
  const crewInterjection = pickCrewInterjection(template, context.crew, context.rng);
  const hiddenOptions = buildHiddenOptions(template, context);

  return {
    id: `${template.id}:${Math.floor(context.rng() * 100000)}`,
    templateId: template.id,
    title: template.title,
    phase: "intro",
    tags: template.tags,
    text: template.intro,
    visibleOptions: template.options,
    hiddenOptions,
    crewInterjection,
    tension: Math.min(10, Math.max(1, context.riskScore + Math.round(context.rng() * 3))),
    memory: {
      factionTouched: inferFaction(template.tags),
      riskScore: context.riskScore,
      backgroundTags: context.backgroundTags
    }
  };
}

function pickCrewInterjection(template, crew, rng) {
  const eligible = crew.filter(c => {
    if (template.tags.includes("pirate")) return c.skills?.streetwise || c.factionTies?.pirates;
    if (template.tags.includes("navy")) return c.skills?.protocol || c.factionTies?.navy;
    if (template.tags.includes("void")) return c.skills?.science || c.traits?.includes("void_sensitive");
    if (template.tags.includes("architect")) return c.skills?.xenoarchaeology || c.skills?.science;
    return c.loyalty > 50;
  });

  if (!eligible.length) return null;
  const crewMember = eligible[Math.floor(rng() * eligible.length)];
  return {
    crewId: crewMember.id,
    name: crewMember.name,
    line: buildCrewLine(template, crewMember)
  };
}

function buildCrewLine(template, crewMember) {
  if (template.tags.includes("void")) return `${crewMember.name}: “That signal is not external. It is inside the ship.”`;
  if (template.tags.includes("pirate")) return `${crewMember.name}: “Their vector is lazy. Either bait, or they think we are already beaten.”`;
  if (template.tags.includes("navy")) return `${crewMember.name}: “If we lie, make it boring. Inspectors love boring.”`;
  if (template.tags.includes("architect")) return `${crewMember.name}: “This is not a ruin. It is a sentence waiting for grammar.”`;
  return `${crewMember.name}: “We have options, but none of them stay clean.”`;
}

function buildHiddenOptions(template, context) {
  const hidden = [];
  if ((context.ship.stats?.stealth ?? 0) >= 4) hidden.push("ghost_burn");
  if ((context.playerState.reputation?.navy ?? 0) >= 40 && template.tags.includes("navy")) hidden.push("invoke_clearance");
  if ((context.playerState.artifacts ?? []).some(a => template.tags.includes("artifact_reaction") && a.active)) {
    hidden.push("artifact_resonance");
  }
  if (context.crew.some(c => c.traits?.includes("liar") || c.skills?.deception >= 3)) hidden.push("crew_bluff");
  return hidden;
}

function inferFaction(tags) {
  if (tags.includes("pirate")) return "pirates";
  if (tags.includes("navy")) return "navy";
  if (tags.includes("smuggler")) return "smugglers";
  if (tags.includes("void")) return "void";
  if (tags.includes("architect")) return "architect";
  return "neutral";
}
