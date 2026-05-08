export function createDiscoveryState(existing = {}) {
  return {
    discoveredSites: existing.discoveredSites ?? {},
    discoveryChains: existing.discoveryChains ?? {},
    loreFragments: existing.loreFragments ?? {},
    hiddenRoutes: existing.hiddenRoutes ?? {},
    salvageClaims: existing.salvageClaims ?? {},
    flags: existing.flags ?? {}
  };
}

export function recordDiscovery(state, discovery) {
  const next = createDiscoveryState(state);

  next.discoveredSites[discovery.id] = {
    ...discovery,
    discoveredAt: discovery.discoveredAt ?? Date.now(),
    investigated: discovery.investigated ?? false
  };

  for (const lore of discovery.loreFragments ?? []) {
    next.loreFragments[lore.id] = lore;
  }

  if (discovery.hiddenRoute) {
    next.hiddenRoutes[discovery.hiddenRoute.id] = discovery.hiddenRoute;
  }

  return next;
}

export function markInvestigated(state, discoveryId) {
  const next = createDiscoveryState(state);
  if (next.discoveredSites[discoveryId]) {
    next.discoveredSites[discoveryId].investigated = true;
  }
  return next;
}
