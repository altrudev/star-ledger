export function deriveArtifactCombatEffects(artifacts = []) {
  const effects = {
    intimidation: 0,
    corruption: 0,
    boardingInstability: 0,
    reactorStress: 0,
    logs: []
  };

  for (const artifact of artifacts) {
    if (artifact.tags?.includes("void")) {
      effects.intimidation += 2;
      effects.corruption += 1;
      effects.logs.push(`${artifact.name} emits unstable harmonics.`);
    }

    if (artifact.awakened) {
      effects.boardingInstability += 2;
      effects.reactorStress += 2;
      effects.logs.push(`${artifact.name} reacts aggressively during combat.`);
    }
  }

  return effects;
}
