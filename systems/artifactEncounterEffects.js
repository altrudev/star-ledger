export function deriveArtifactEncounterOptions(artifacts = [], encounter = {}) {
  const options = [];

  for (const artifact of artifacts) {
    if (artifact.tags?.includes("artifact_reaction")) {
      options.push({
        artifactId: artifact.id,
        label: `Use ${artifact.name}`,
        effectType: "artifact",
        danger: artifact.danger
      });
    }

    if (artifact.awakened && encounter.tags?.includes("psychological")) {
      options.push({
        artifactId: artifact.id,
        label: `${artifact.name} reacts autonomously`,
        effectType: "autonomous",
        danger: artifact.danger + 2
      });
    }
  }

  return options;
}
