import { createSeededRng } from "./rng.js";
import { DEFAULT_SECTORS, DEFAULT_ROUTES, DEFAULT_FACTIONS } from "../data/galaxySeedData.js";
import { normalizeSector, evolveSector } from "./sectorState.js";
import { normalizeRoute, evolveRoute } from "./routeEvolution.js";
import { advanceFactionAI } from "./factionAI.js";
import { initializeMarkets, advanceEconomy } from "./economySimulation.js";
import { advanceVoidPropagation } from "./voidPropagation.js";
import { generateWorldEvents } from "./worldEventDirector.js";
import { applyWorldEvents } from "./worldEventApplier.js";
import { applyPlayerActionsToGalaxy } from "./playerConsequences.js";
import { generateRumors } from "./rumorIntel.js";
import { calculateEndingPressure } from "./endingPressure.js";

export function createGalaxySimulation({ initialGalaxy = null, playerState = {}, seed = null } = {}) {
  const rng = createSeededRng(seed ?? playerState.runSeed ?? "star-ledger-galaxy");
  let turn = initialGalaxy?.turn ?? 0;

  let galaxy = initialGalaxy ?? {
    sectors: normalizeMap(DEFAULT_SECTORS, normalizeSector),
    routes: normalizeMap(DEFAULT_ROUTES, normalizeRoute),
    factions: JSON.parse(JSON.stringify(DEFAULT_FACTIONS)),
    markets: initializeMarkets(),
    rumors: [],
    worldEvents: [],
    endingPressure: {}
  };

  function advanceGalaxyTurn({ playerActions = [] } = {}) {
    turn += 1;

    galaxy = applyPlayerActionsToGalaxy(galaxy, playerActions);

    const sectorsAfterDrift = {};
    for (const [id, sector] of Object.entries(galaxy.sectors)) {
      sectorsAfterDrift[id] = evolveSector(sector, { voidGlobalPressure: 0 });
    }

    const routesAfterDrift = {};
    for (const [id, route] of Object.entries(galaxy.routes)) {
      routesAfterDrift[id] = evolveRoute(route, sectorsAfterDrift);
    }

    let factionResult = advanceFactionAI(galaxy.factions, sectorsAfterDrift, routesAfterDrift, rng);

    let voidResult = advanceVoidPropagation(sectorsAfterDrift, routesAfterDrift, rng);

    const worldEvents = generateWorldEvents({
      sectors: voidResult.sectors,
      routes: voidResult.routes,
      rng,
      maxEvents: 2
    });

    const applied = applyWorldEvents({
      sectors: voidResult.sectors,
      routes: voidResult.routes,
      factions: factionResult.factions,
      events: worldEvents
    });

    const markets = advanceEconomy(galaxy.markets, applied.sectors, worldEvents);
    const rumors = generateRumors({
      sectors: applied.sectors,
      routes: applied.routes,
      markets,
      events: [...worldEvents, ...voidResult.voidEvents],
      rng
    });

    const endingPressure = calculateEndingPressure({
      sectors: applied.sectors,
      factions: applied.factions,
      routes: applied.routes,
      playerState
    });

    galaxy = {
      turn,
      sectors: applied.sectors,
      routes: applied.routes,
      factions: applied.factions,
      markets,
      rumors,
      worldEvents,
      factionIntents: factionResult.intents,
      voidEvents: voidResult.voidEvents,
      endingPressure
    };

    return getState();
  }

  function getState() {
    return JSON.parse(JSON.stringify(galaxy));
  }

  return { advanceGalaxyTurn, getState };
}

function normalizeMap(map, fn) {
  const result = {};
  for (const [id, value] of Object.entries(map)) result[id] = fn(value);
  return result;
}
