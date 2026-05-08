import { instantiateArtifactCollection } from "./artifactState.js";
import { evaluateArtifactResonance } from "./artifactResonance.js";
import { activateArtifactAbility } from "./artifactAbilities.js";
import { detectArtifactCombinations } from "./artifactCombinations.js";
import { evaluateArtifactAwakening } from "./artifactAwakening.js";

export function runArtifactDemo() {
  let artifacts = instantiateArtifactCollection([
    "void_resonance_cube",
    "architect_lens",
    "memory_spindle"
  ]);

  const resonance = artifacts.map(a =>
    evaluateArtifactResonance(a, {
      tags: ["void", "signal", "architect"],
      voidPressure: 4
    })
  );

  artifacts = resonance.map(r => r.artifact);

  const activation = activateArtifactAbility(
    artifacts[0],
    "void_pulse"
  );

  artifacts[0] = activation.artifact;

  const awakening = evaluateArtifactAwakening(
    artifacts[0],
    { resonanceLevel: resonance[0].resonanceLevel }
  );

  const combinations = detectArtifactCombinations(artifacts);

  return {
    artifacts,
    resonance,
    activation,
    awakening,
    combinations
  };
}
