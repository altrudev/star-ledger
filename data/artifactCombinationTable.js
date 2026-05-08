export const ARTIFACT_COMBINATIONS = [
  {
    id: "void_lens_interference",
    requires: ["void_resonance_cube", "architect_lens"],
    effect: {
      hiddenVoidRoutes: true,
      corruption: 1,
      anomalyDetection: 3
    },
    text: "The Lens attempts to stabilize the Void harmonics. Reality disagrees."
  },

  {
    id: "cataclysm_memory_feedback",
    requires: ["cataclysm_seed", "memory_spindle"],
    effect: {
      memoryCorruption: true,
      crewStress: 2,
      hiddenLoreChance: 0.35
    },
    text: "The Seed feeds on recorded memory patterns."
  },

  {
    id: "architect_resonance_matrix",
    requires: ["architect_lens", "memory_spindle"],
    effect: {
      architectSecrets: true,
      xenoarchaeologyBonus: 2
    },
    text: "The artifacts begin speaking in compatible geometry."
  }
];
