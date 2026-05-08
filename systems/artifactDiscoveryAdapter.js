export function artifactDiscoveryModifiers(artifacts = [], context = {}) {
  const mods = {
    discoveryChance: 0,
    riskDelta: 0,
    forcedTags: [],
    approachUnlocks: []
  };

  for (const artifact of artifacts) {
    if (artifact.tags?.includes("architect")) {
      mods.discoveryChance += 0.12;
      mods.forcedTags.push("architect");
      mods.approachUnlocks.push("artifact_probe");
    }

    if (artifact.tags?.includes("void")) {
      mods.discoveryChance += 0.08;
      mods.riskDelta += 1;
      mods.forcedTags.push("void");
    }

    if (artifact.awakened) {
      mods.discoveryChance += 0.1;
      mods.riskDelta += 2;
    }
  }

  return mods;
}
