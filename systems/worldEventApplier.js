import { applySectorDelta } from "./sectorState.js";
import { applyRouteDelta } from "./routeEvolution.js";

export function applyWorldEvents({ sectors, routes, factions, events }) {
  let nextSectors = JSON.parse(JSON.stringify(sectors));
  let nextRoutes = JSON.parse(JSON.stringify(routes));
  let nextFactions = JSON.parse(JSON.stringify(factions));

  for (const event of events) {
    if (event.effects?.sector && nextSectors[event.sectorId]) {
      nextSectors[event.sectorId] = applySectorDelta(nextSectors[event.sectorId], event.effects.sector);
    }

    if (event.effects?.route) {
      for (const route of Object.values(nextRoutes)) {
        if (route.from === event.sectorId || route.to === event.sectorId) {
          nextRoutes[route.id] = applyRouteDelta(route, event.effects.route);
        }
      }
    }

    if (event.effects?.faction) {
      for (const [factionId, delta] of Object.entries(event.effects.faction)) {
        if (!nextFactions[factionId]) continue;
        for (const [key, value] of Object.entries(delta)) {
          nextFactions[factionId][key] = (nextFactions[factionId][key] ?? 0) + value;
        }
      }
    }
  }

  return {
    sectors: nextSectors,
    routes: nextRoutes,
    factions: nextFactions
  };
}
