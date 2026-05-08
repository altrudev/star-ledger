export function generateRumors({ sectors, routes, markets, events = [], rng = Math.random }) {
  const rumors = [];

  for (const event of events) {
    if (event.rumor) {
      rumors.push({
        id: `rumor_${event.instanceId}`,
        type: "world_event",
        text: event.rumor,
        reliability: 0.75,
        tags: event.tags ?? [],
        sectorId: event.sectorId
      });
    }
  }

  const unstableSector = Object.values(sectors).sort((a, b) => (b.conflict + b.voidPressure) - (a.conflict + a.voidPressure))[0];
  if (unstableSector && rng() < 0.7) {
    rumors.push({
      id: `rumor_unstable_${unstableSector.id}`,
      type: "sector_warning",
      text: `${unstableSector.name} is becoming unstable. Captains are asking for hazard pay.`,
      reliability: 0.62,
      tags: ["sector", "risk"],
      sectorId: unstableSector.id
    });
  }

  const hotMarket = Object.values(markets).sort((a, b) => b.currentPrice - a.currentPrice)[0];
  if (hotMarket && rng() < 0.6) {
    rumors.push({
      id: `rumor_market_${hotMarket.id}`,
      type: "market",
      text: `${hotMarket.id} prices are moving fast. Someone knows something.`,
      reliability: 0.58,
      tags: ["market", hotMarket.id]
    });
  }

  const dangerousRoute = Object.values(routes).sort((a, b) => (b.piracy + b.voidPressure + b.blockade) - (a.piracy + a.voidPressure + a.blockade))[0];
  if (dangerousRoute && rng() < 0.65) {
    rumors.push({
      id: `rumor_route_${dangerousRoute.id}`,
      type: "route_warning",
      text: `Traffic is thinning along ${dangerousRoute.id}. That usually means survivors learned first.`,
      reliability: 0.66,
      tags: ["route", "danger"],
      routeId: dangerousRoute.id
    });
  }

  return rumors.slice(0, 6);
}
