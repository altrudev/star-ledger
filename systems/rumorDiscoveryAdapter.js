export function rumorToDiscoverySeed(rumor) {
  if (!rumor) return null;

  if (rumor.tags?.includes("route")) {
    return {
      source: "rumor",
      routeId: rumor.routeId,
      tags: rumor.tags,
      reliability: rumor.reliability
    };
  }

  if (rumor.tags?.includes("market") || rumor.tags?.includes("sector")) {
    return {
      source: "rumor",
      sectorId: rumor.sectorId,
      tags: rumor.tags,
      reliability: rumor.reliability
    };
  }

  return {
    source: "rumor",
    tags: rumor.tags ?? [],
    reliability: rumor.reliability ?? 0.5
  };
}

export function shouldRumorRevealDiscovery(rumor, rng = Math.random) {
  const reliability = rumor.reliability ?? 0.5;
  return rng() < reliability * 0.45;
}
