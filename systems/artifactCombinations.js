import { ARTIFACT_COMBINATIONS } from "../data/artifactCombinationTable.js";

export function detectArtifactCombinations(artifacts = []) {
  const ids = artifacts.map(a => a.id);

  return ARTIFACT_COMBINATIONS.filter(combo =>
    combo.requires.every(req => ids.includes(req))
  );
}

export function applyArtifactCombinationEffects(state, combinations = []) {
  const next = {
    ...state,
    corruption: state.corruption ?? 0,
    crewStress: state.crewStress ?? 0,
    flags: { ...(state.flags ?? {}) }
  };

  for (const combo of combinations) {
    if (combo.effect.corruption) next.corruption += combo.effect.corruption;
    if (combo.effect.crewStress) next.crewStress += combo.effect.crewStress;

    for (const key of Object.keys(combo.effect)) {
      if (typeof combo.effect[key] === "boolean") {
        next.flags[key] = combo.effect[key];
      }
    }
  }

  return next;
}
