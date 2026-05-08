import { createSeededRng } from "./rng.js";
import { createTravelPacing } from "./travelPacing.js";
import { AMBIENT_TRAVEL_EVENTS } from "../data/ambientTravelEvents.js";
import { LIGHT_TRAVEL_DECISIONS } from "../data/lightTravelDecisions.js";
import { MAJOR_TRAVEL_EVENTS } from "../data/majorTravelEvents.js";
import { buildTravelVisualState } from "./travelVisualDirector.js";
import { deriveTravelMood, TRAVEL_MOOD_HINTS } from "./travelAudioMood.js";

export function createTravelDirector({ route, ship = {}, crew = [], playerState = {}, galaxyState = {}, seed = null }) {
  const routeId = route.id ?? `${route.originId}->${route.destinationId}`;
  const rng = createSeededRng(seed ?? `${playerState.runSeed ?? "run"}:${routeId}`);
  const routeState = buildRouteState({ route, playerState, galaxyState, rng });
  const pacing = createTravelPacing({ tripLength: routeState.tripLength, risk: routeState.risk, rng });
  let tick = 0;

  function advanceTravel() {
    tick += 1;
    const kind = pacing.nextKind();
    const event = pickEvent(kind, routeState, rng);
    const visual = buildTravelVisualState({ routeState, tick, tripLength: routeState.tripLength, event });
    const mood = deriveTravelMood({ risk: routeState.risk, tags: event?.tags ?? routeState.tags, phase: visual.phase, lastEventMood: event?.mood });

    return {
      kind,
      tick,
      tripLength: routeState.tripLength,
      complete: tick >= routeState.tripLength,
      routeId,
      routeState,
      event,
      visual,
      audio: TRAVEL_MOOD_HINTS[mood],
      crewHint: buildCrewHint({ crew, event, routeState, rng }),
      pacing: pacing.getBudget()
    };
  }

  return { advanceTravel, getState: () => ({ routeId, tick, routeState, pacing: pacing.getBudget() }) };
}

function buildRouteState({ route, playerState, galaxyState, rng }) {
  const factionHeat = galaxyState.factionHeat?.[route.faction ?? "neutral"] ?? 0;
  const voidPressure = route.voidPressure ?? Math.floor(rng() * 4);
  const anomalyDensity = route.anomalyDensity ?? Math.floor(rng() * 5);
  const baseRisk = route.risk ?? route.danger ?? 2;
  const risk = clamp(baseRisk + Math.round(factionHeat * 0.4) + Math.round(voidPressure * 0.45) + Math.round((playerState.wantedLevel ?? 0) * 0.5), 0, 10);

  return {
    id: route.id,
    risk,
    tripLength: Math.max(4, route.distance ?? 6),
    voidPressure,
    anomalyDensity,
    factionHeat,
    biomeLayer: route.biomeLayer ?? inferBiomeLayer(route),
    factionLayer: factionHeat > 3 ? `${route.faction}_traffic` : null,
    tags: [route.faction, voidPressure > 5 ? "void" : null, anomalyDensity > 4 ? "anomaly" : null].filter(Boolean)
  };
}

function pickEvent(kind, routeState, rng) {
  if (kind === "ambient") return weightedPick(AMBIENT_TRAVEL_EVENTS, rng);
  if (kind === "light_decision") return weightedPick(LIGHT_TRAVEL_DECISIONS, rng);
  if (kind === "major_event") {
    const candidates = MAJOR_TRAVEL_EVENTS.filter(e => (e.minRisk ?? 0) <= routeState.risk);
    return weightedPick(candidates.length ? candidates : MAJOR_TRAVEL_EVENTS, rng);
  }
  return null;
}

function buildCrewHint({ crew, event, routeState, rng }) {
  if (!crew.length || rng() > 0.35) return null;
  const c = crew[Math.floor(rng() * crew.length)];
  if (event?.tags?.includes("void")) return `${c.name}: “Something about this route is looking back.”`;
  if (event?.tags?.includes("architect")) return `${c.name}: “This was built, not born.”`;
  if (routeState.risk >= 7) return `${c.name}: “Captain, this route is tightening around us.”`;
  return `${c.name}: “Holding vector.”`;
}

function inferBiomeLayer(route) {
  if (route.tags?.includes("nebula")) return "nebula_drift";
  if (route.tags?.includes("debris")) return "debris_lane";
  if (route.tags?.includes("void")) return "void_scar";
  if (route.tags?.includes("industrial")) return "mining_lanterns";
  return "quiet_starfield";
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

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
