import { WORLD_EVENT_TEMPLATES } from "../data/worldEventTemplates.js";

export function generateWorldEvents({ sectors, routes, rng = Math.random, maxEvents = 2 }) {
  const events = [];

  for (const sector of Object.values(sectors)) {
    if (events.length >= maxEvents) break;

    const candidates = WORLD_EVENT_TEMPLATES.filter(template => conditionsPass(template.conditions ?? {}, sector, routes));
    if (!candidates.length) continue;

    const chance = Math.min(0.22, 0.03 + (100 - (sector.stability ?? 50)) * 0.0015 + (sector.conflict ?? 0) * 0.0015);
    if (rng() < chance) {
      const template = weightedPick(candidates, rng);
      events.push({
        ...template,
        instanceId: `${template.id}_${sector.id}_${Math.floor(rng() * 99999)}`,
        sectorId: sector.id
      });
    }
  }

  return events;
}

function conditionsPass(conditions, sector, routes) {
  if (conditions.minPiracy) {
    const routePiracy = Object.values(routes).some(r => (r.from === sector.id || r.to === sector.id) && (r.piracy ?? 0) >= conditions.minPiracy);
    if (!routePiracy) return false;
  }

  if (conditions.maxLaw !== undefined && (sector.law ?? 50) > conditions.maxLaw) return false;
  if (conditions.minVoidPressure !== undefined && (sector.voidPressure ?? 0) < conditions.minVoidPressure) return false;
  if (conditions.minConflict !== undefined && (sector.conflict ?? 0) < conditions.minConflict) return false;
  if (conditions.minCorruption !== undefined && (sector.corruption ?? 0) < conditions.minCorruption) return false;
  if (conditions.resource && !(sector.resources ?? []).includes(conditions.resource)) return false;
  if (conditions.tag && !(sector.tags ?? []).includes(conditions.tag)) return false;

  return true;
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
