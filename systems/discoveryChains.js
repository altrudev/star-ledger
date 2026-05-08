import { DISCOVERY_CHAIN_TEMPLATES } from "../data/discoveryTables.js";

export function advanceDiscoveryChain(state, chainId, clueId) {
  const template = DISCOVERY_CHAIN_TEMPLATES[chainId];
  if (!template) return state;

  const next = {
    ...state,
    discoveryChains: { ...(state.discoveryChains ?? {}) }
  };

  const current = next.discoveryChains[chainId] ?? {
    id: chainId,
    name: template.name,
    progress: 0,
    clues: [],
    completed: false
  };

  if (!current.clues.includes(clueId)) {
    current.clues.push(clueId);
    current.progress += 1;
  }

  if (current.progress >= template.stages.length) {
    current.completed = true;
    current.finalReward = template.finalReward;
  }

  next.discoveryChains[chainId] = current;
  return next;
}

export function inferChainFromDiscovery(discovery) {
  if (discovery.tags.includes("architect")) return "architect_map_chain";
  if (discovery.tags.includes("void")) return "void_dream_chain";
  if (discovery.tags.includes("history") || discovery.tags.includes("battlefield")) return "war_archive_chain";
  return null;
}
