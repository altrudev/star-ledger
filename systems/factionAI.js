import { clamp } from "./rng.js";

export function advanceFactionAI(factions, sectors, routes, rng = Math.random) {
  const nextFactions = JSON.parse(JSON.stringify(factions));
  const intents = [];

  for (const faction of Object.values(nextFactions)) {
    const goal = chooseGoal(faction, rng);
    const target = chooseTargetSector(faction, sectors, goal, rng);

    if (!target) continue;

    const intent = buildIntent(faction, goal, target);
    intents.push(intent);
    applyIntentToFaction(faction, intent);
  }

  return { factions: nextFactions, intents };
}

function chooseGoal(faction, rng) {
  const goals = faction.goals ?? ["survive"];
  return goals[Math.floor(rng() * goals.length)];
}

function chooseTargetSector(faction, sectors, goal, rng) {
  const values = Object.values(sectors);
  if (!values.length) return null;

  if (goal === "suppress_pirates") {
    return values.sort((a, b) => (b.corruption + b.conflict) - (a.corruption + a.conflict))[0];
  }

  if (goal === "capture_routes" || goal === "expand_raids") {
    return values.sort((a, b) => (a.law + a.stability) - (b.law + b.stability))[0];
  }

  if (goal === "secure_resources") {
    return values.sort((a, b) => (b.wealth) - (a.wealth))[0];
  }

  if (goal === "control_artifacts") {
    return values.find(s => s.resources?.includes("artifacts") || s.tags?.includes("architect")) ?? values[0];
  }

  return values[Math.floor(rng() * values.length)];
}

function buildIntent(faction, goal, target) {
  const base = {
    factionId: faction.id,
    goal,
    targetSectorId: target.id,
    intensity: Math.max(1, Math.round((faction.power + faction.aggression) / 40))
  };

  if (goal === "suppress_pirates") return { ...base, type: "crackdown" };
  if (goal === "expand_raids") return { ...base, type: "raid" };
  if (goal === "capture_routes") return { ...base, type: "route_pressure" };
  if (goal === "secure_resources") return { ...base, type: "industrial_push" };
  if (goal === "open_hidden_routes") return { ...base, type: "smuggler_probe" };
  if (goal === "control_artifacts") return { ...base, type: "artifact_race" };

  return { ...base, type: "stabilize" };
}

function applyIntentToFaction(faction, intent) {
  if (intent.type === "raid") faction.wealth = clamp(faction.wealth + 1, 0, 100);
  if (intent.type === "crackdown") faction.legitimacy = clamp(faction.legitimacy + 1, 0, 100);
  if (intent.type === "artifact_race") faction.aggression = clamp(faction.aggression + 1, 0, 100);
}
