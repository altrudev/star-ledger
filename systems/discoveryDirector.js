import { createSeededRng } from "./rng.js";
import { generateDiscovery } from "./discoveryGenerator.js";
import { recordDiscovery, markInvestigated, createDiscoveryState } from "./discoveryState.js";
import { resolveDiscoveryInvestigation } from "./discoveryResolver.js";
import { advanceDiscoveryChain, inferChainFromDiscovery } from "./discoveryChains.js";
import { artifactDiscoveryModifiers } from "./artifactDiscoveryAdapter.js";

export function createDiscoveryDirector({ discoveryState = {}, playerState = {}, artifacts = [], seed = null } = {}) {
  let state = createDiscoveryState(discoveryState);
  const rng = createSeededRng(seed ?? playerState.runSeed ?? "star-ledger-discovery");

  function maybeDiscover(context = {}) {
    const mods = artifactDiscoveryModifiers(artifacts, context);
    const baseChance = context.baseChance ?? 0.12;
    const chance = Math.min(0.75, baseChance + mods.discoveryChance + (context.anomalyDensity ?? 0) * 0.03);

    if (rng() > chance) return null;

    const discovery = generateDiscovery({
      routeState: context.routeState,
      sector: context.sector,
      source: context.source ?? "travel",
      seed: `${state.seed ?? "discover"}:${Date.now()}:${Math.floor(rng() * 99999)}`
    });

    discovery.risk += mods.riskDelta;
    discovery.tags = [...new Set([...(discovery.tags ?? []), ...mods.forcedTags])];

    state = recordDiscovery(state, discovery);

    const chainId = inferChainFromDiscovery(discovery);
    if (chainId) {
      state = advanceDiscoveryChain(state, chainId, discovery.id);
    }

    return discovery;
  }

  function investigate(discoveryId, approach = "scan", context = {}) {
    const discovery = state.discoveredSites[discoveryId];
    if (!discovery) return null;

    const result = resolveDiscoveryInvestigation(discovery, approach, context);
    state = markInvestigated(state, discoveryId);

    return result;
  }

  return {
    maybeDiscover,
    investigate,
    getState: () => JSON.parse(JSON.stringify(state))
  };
}
