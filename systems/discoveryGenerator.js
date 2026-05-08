import { createSeededRng } from "./rng.js";
import { DISCOVERY_ARCHETYPES } from "../data/discoveryTables.js";

export function generateDiscovery({ routeState = {}, sector = {}, source = "travel", seed = null } = {}) {
  const rng = createSeededRng(seed ?? `${routeState.id ?? sector.id ?? "unknown"}:${source}:discovery`);
  const category = pickCategory(routeState, sector, rng);
  const template = weightedPick(DISCOVERY_ARCHETYPES[category], rng);

  const id = `${category}_${template.id}_${Math.floor(rng() * 99999)}`;

  return {
    id,
    category,
    templateId: template.id,
    name: template.name,
    text: template.text,
    tags: template.tags,
    risk: template.risk + Math.round((routeState.risk ?? 0) * 0.35),
    rewards: template.rewards,
    source,
    sectorId: sector.id ?? null,
    routeId: routeState.id ?? null,
    investigated: false,
    loreFragments: buildLoreFragments(template, rng),
    hiddenRoute: template.rewards.includes("hidden_route") ? buildHiddenRoute(routeState, sector, rng) : null
  };
}

function pickCategory(routeState, sector, rng) {
  if ((routeState.voidPressure ?? sector.voidPressure ?? 0) > 35 && rng() < 0.45) return "anomaly";
  if ((sector.tags ?? []).includes("architect") && rng() < 0.5) return "ruin";
  if (rng() < 0.35) return "salvage";
  return rng() < 0.55 ? "anomaly" : "ruin";
}

function buildLoreFragments(template, rng) {
  if (!template.rewards.some(r => r.includes("lore") || r.includes("memory"))) return [];

  return [{
    id: `lore_${template.id}_${Math.floor(rng() * 99999)}`,
    title: `${template.name} Fragment`,
    text: `Recovered fragment linked to ${template.name}.`,
    tags: template.tags
  }];
}

function buildHiddenRoute(routeState, sector, rng) {
  return {
    id: `hidden_route_${Math.floor(rng() * 99999)}`,
    from: routeState.from ?? sector.id ?? "unknown",
    to: `unknown_sector_${Math.floor(rng() * 999)}`,
    stability: 30 + Math.floor(rng() * 40),
    danger: 4 + Math.floor(rng() * 5),
    revealed: true,
    tags: ["hidden", "discovery"]
  };
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
