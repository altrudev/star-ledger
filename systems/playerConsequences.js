import { applySectorDelta } from "./sectorState.js";
import { applyRouteDelta } from "./routeEvolution.js";

export function applyPlayerActionsToGalaxy(galaxy, playerActions = []) {
  let next = JSON.parse(JSON.stringify(galaxy));

  for (const action of playerActions) {
    if (action.type === "saved_convoy") {
      const sectorId = action.sectorId;
      if (next.sectors[sectorId]) {
        next.sectors[sectorId] = applySectorDelta(next.sectors[sectorId], {
          stability: 4,
          wealth: 2,
          populationPressure: -2
        });
      }
    }

    if (action.type === "destroyed_pirates") {
      const routeId = action.routeId;
      if (next.routes[routeId]) {
        next.routes[routeId] = applyRouteDelta(next.routes[routeId], {
          piracy: -12,
          traffic: 6,
          stability: 5
        });
      }
    }

    if (action.type === "smuggled_artifact") {
      const sectorId = action.sectorId;
      if (next.sectors[sectorId]) {
        next.sectors[sectorId] = applySectorDelta(next.sectors[sectorId], {
          corruption: 6,
          voidPressure: 4,
          wealth: 5
        });
      }
    }

    if (action.type === "betrayed_faction") {
      const factionId = action.factionId;
      if (next.factions[factionId]) {
        next.factions[factionId].relations.player = (next.factions[factionId].relations.player ?? 0) - 15;
      }
    }

    if (action.type === "revealed_architect_route") {
      const routeId = action.routeId;
      if (next.routes[routeId]) {
        next.routes[routeId].hidden = false;
        next.routes[routeId] = applyRouteDelta(next.routes[routeId], {
          traffic: 8,
          conflict: 0
        });
      }
    }
  }

  return next;
}
