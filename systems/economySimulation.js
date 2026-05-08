import { DEFAULT_MARKETS } from "../data/galaxySeedData.js";

export function initializeMarkets(markets = DEFAULT_MARKETS) {
  const result = {};
  for (const [id, data] of Object.entries(markets)) {
    result[id] = {
      id,
      basePrice: data.basePrice,
      currentPrice: data.basePrice,
      volatility: data.volatility,
      scarcity: 0,
      demand: 0
    };
  }
  return result;
}

export function advanceEconomy(markets, sectors, worldEvents = []) {
  const next = JSON.parse(JSON.stringify(markets));

  for (const market of Object.values(next)) {
    market.demand = 0;
    market.scarcity = 0;
  }

  for (const sector of Object.values(sectors)) {
    if ((sector.populationPressure ?? 0) > 55) {
      increaseDemand(next, "food", 0.08);
      increaseDemand(next, "medicine", 0.08);
    }

    if ((sector.conflict ?? 0) > 45) {
      increaseDemand(next, "weapons", 0.12);
      increaseDemand(next, "medicine", 0.1);
      increaseDemand(next, "fuel", 0.05);
    }

    if ((sector.voidPressure ?? 0) > 35) {
      increaseDemand(next, "artifacts", 0.14);
      increaseDemand(next, "medicine", 0.06);
    }

    for (const resource of sector.resources ?? []) {
      if (next[resource]) next[resource].scarcity -= 0.04;
    }
  }

  for (const event of worldEvents) {
    for (const [commodity, mod] of Object.entries(event.effects?.market ?? {})) {
      if (next[commodity]) {
        next[commodity].demand += mod;
      }
    }
  }

  for (const market of Object.values(next)) {
    const pressure = market.demand + market.scarcity;
    market.currentPrice = Math.max(1, Math.round(market.basePrice * (1 + pressure)));
  }

  return next;
}

function increaseDemand(markets, commodity, amount) {
  if (markets[commodity]) markets[commodity].demand += amount;
}
