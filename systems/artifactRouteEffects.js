export function deriveArtifactRouteEffects(artifacts = [], routeState = {}) {
  const effects = {
    hiddenRoutes: false,
    voidPressureDelta: 0,
    riskDelta: 0,
    encounterBias: {},
    text: []
  };

  for (const artifact of artifacts) {
    if (artifact.tags?.includes("void")) {
      effects.voidPressureDelta += 1;
      effects.riskDelta += 1;
      effects.text.push(`${artifact.name} disturbs local spacetime.`);
    }

    if (artifact.tags?.includes("architect")) {
      effects.hiddenRoutes = true;
      effects.text.push(`${artifact.name} reveals hidden vectors.`);
    }

    if (artifact.awakened) {
      effects.riskDelta += 2;
      effects.text.push(`${artifact.name} radiates unstable energy.`);
    }
  }

  return effects;
}
