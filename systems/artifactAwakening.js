export function evaluateArtifactAwakening(artifact, context = {}) {
  const exposure = artifact.exposure ?? 0;
  const resonance = context.resonanceLevel ?? 0;
  const corruption = artifact.corruptionLoad ?? 0;

  const awakeningScore =
    exposure +
    resonance +
    Math.floor(corruption / 5);

  const awakened = awakeningScore >= 10;

  return {
    awakened,
    awakeningScore,
    text: awakened
      ? `${artifact.name} no longer feels dormant.`
      : `${artifact.name} remains quiet.`
  };
}

export function awakenArtifact(artifact) {
  return {
    ...artifact,
    awakened: true,
    flags: {
      ...(artifact.flags ?? {}),
      awakened: true
    }
  };
}
