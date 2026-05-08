export const ARTIFACT_EFFECTS = {
  architect_beacon_prism: {
    class: "architect",
    passive: { routeDiscoveryChance: 0.08, dangerReduction: 1 },
    encounterHooks: ["architect_echo", "hidden_route"]
  },
  starforged_compass: {
    class: "architect",
    passive: { navigationBonus: 2, fuelEfficiency: 0.12 },
    encounterHooks: ["route_reroll", "safe_vector"]
  },
  void_resonance_cube: {
    class: "void",
    passive: { powerBonus: 3, corruptionGain: 1 },
    encounterHooks: ["void_static", "hallucination_option"]
  },
  null_choir_relic: {
    class: "void",
    passive: { intimidation: 2, crewStress: 1 },
    encounterHooks: ["psychic_wave", "choir_whisper"]
  },
  continuum_archive_heart: {
    class: "architect",
    passive: { loreUnlockChance: 0.2, crewInsight: 1 },
    encounterHooks: ["memory_reconstruction", "civilization_echo"]
  },
  cataclysm_seed: {
    class: "void",
    passive: { dangerIncrease: 2, blackMarketValue: 5 },
    encounterHooks: ["cataclysm_pressure", "threaten_deterrence"]
  }
};

export function applyArtifactPassiveModifiers(playerState, routeRisk) {
  const artifacts = playerState.artifacts ?? [];
  let modified = { ...routeRisk, score: routeRisk.score, components: { ...routeRisk.components } };

  for (const artifact of artifacts) {
    const effect = ARTIFACT_EFFECTS[artifact.id];
    if (!effect) continue;

    if (effect.passive?.dangerReduction) modified.score -= effect.passive.dangerReduction;
    if (effect.passive?.dangerIncrease) modified.score += effect.passive.dangerIncrease;
    if (effect.passive?.corruptionGain) {
      modified.components.artifactCorruption = (modified.components.artifactCorruption ?? 0) + effect.passive.corruptionGain;
    }
  }

  modified.score = Math.max(0, Math.min(10, modified.score));
  return modified;
}
