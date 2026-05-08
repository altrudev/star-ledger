import { createSeededRng, rollChance } from "./rng.js";
import { calculateRouteRisk } from "./routeRisk.js";
import { TRAVEL_BACKGROUNDS, pickWeighted } from "../data/travelBackgrounds.js";

export function createTravelSession({
  originId,
  destinationId,
  origin = {},
  destination = {},
  ship = {},
  crew = [],
  playerState = {},
  galaxyState = {},
  seed = null
}) {
  const seedText = seed ?? `${originId}->${destinationId}:${playerState.runSeed ?? "run"}`;
  const rng = createSeededRng(seedText);
  const background = pickWeighted(TRAVEL_BACKGROUNDS, rng);
  const risk = calculateRouteRisk({ origin, destination, ship, crew, playerState, galaxyState, background });

  const totalTicks = Math.max(2, Math.round((destination.distance ?? 2) + risk.score * 0.35));
  let tick = 0;

  function advance() {
    tick += 1;

    const fuelCost = Math.max(1, Math.ceil((destination.distance ?? 2) * 0.4));
    const encounterChance = Math.min(0.8, 0.1 + risk.score * 0.06 + tick * 0.025);
    const anomalyChance = Math.min(0.45, 0.03 + risk.score * 0.025);

    const encounterSeed = rollChance(encounterChance, rng)
      ? `${seedText}:encounter:${tick}:${Math.floor(rng() * 999999)}`
      : null;

    const anomalySeed = rollChance(anomalyChance, rng)
      ? `${seedText}:anomaly:${tick}:${Math.floor(rng() * 999999)}`
      : null;

    return {
      type: "travel_tick",
      tick,
      totalTicks,
      complete: tick >= totalTicks,
      originId,
      destinationId,
      background,
      risk,
      resourceDelta: { fuel: -fuelCost },
      encounterSeed,
      anomalySeed,
      ui: buildTravelUiState({ tick, totalTicks, background, risk, destination })
    };
  }

  return {
    advance,
    getState() {
      return { tick, totalTicks, originId, destinationId, background, risk };
    }
  };
}

function buildTravelUiState({ tick, totalTicks, background, risk, destination }) {
  return {
    title: `Jump Vector: ${destination.name ?? "Unknown Destination"}`,
    progress: tick / totalTicks,
    dangerLabel: risk.score >= 7 ? "Critical" : risk.score >= 4 ? "Unstable" : "Manageable",
    backgroundId: background.id,
    backgroundLayers: background.layers,
    tags: background.tags
  };
}
