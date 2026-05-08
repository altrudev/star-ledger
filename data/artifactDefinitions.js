export const ARTIFACT_DEFINITIONS = {
  void_resonance_cube: {
    id: "void_resonance_cube",
    name: "Void Resonance Cube",
    origin: "void",
    rarity: "rare",
    danger: 8,
    tags: ["void", "signal", "artifact_reaction"],
    passiveEffects: [
      { id: "void_signal_detection", description: "Detects hidden Void anomalies." }
    ],
    activeAbilities: [
      {
        id: "void_pulse",
        name: "Void Pulse",
        cooldown: 3,
        corruption: 2,
        effect: {
          intimidation: 4,
          tension: -2,
          artifactShock: true
        }
      }
    ],
    resonanceTriggers: ["void", "psychological", "signal"],
    instability: 7
  },

  architect_lens: {
    id: "architect_lens",
    name: "Architect Lens",
    origin: "architect",
    rarity: "legendary",
    danger: 5,
    tags: ["architect", "navigation", "artifact_reaction"],
    passiveEffects: [
      { id: "hidden_route_detection", description: "Reveals hidden Architect vectors." }
    ],
    activeAbilities: [
      {
        id: "pattern_resolution",
        name: "Pattern Resolution",
        cooldown: 2,
        corruption: 0,
        effect: {
          routeDiscovery: true,
          scienceBonus: 2
        }
      }
    ],
    resonanceTriggers: ["architect", "xenoarchaeology", "navigation"],
    instability: 3
  },

  cataclysm_seed: {
    id: "cataclysm_seed",
    name: "Cataclysm Seed",
    origin: "unknown",
    rarity: "mythic",
    danger: 10,
    tags: ["cataclysm", "void", "artifact_reaction"],
    passiveEffects: [
      { id: "sector_instability", description: "Nearby routes become unstable." }
    ],
    activeAbilities: [
      {
        id: "entropy_bloom",
        name: "Entropy Bloom",
        cooldown: 6,
        corruption: 4,
        effect: {
          disableEnemies: true,
          voidSpread: 2,
          crewStress: 2
        }
      }
    ],
    resonanceTriggers: ["combat", "void", "fear"],
    instability: 10
  },

  memory_spindle: {
    id: "memory_spindle",
    name: "Memory Spindle",
    origin: "architect",
    rarity: "rare",
    danger: 4,
    tags: ["memory", "artifact_reaction"],
    passiveEffects: [
      { id: "memory_recovery", description: "May restore fragmented route memory." }
    ],
    activeAbilities: [
      {
        id: "echo_replay",
        name: "Echo Replay",
        cooldown: 4,
        corruption: 1,
        effect: {
          revealPastEvent: true,
          loyaltyBonus: 1
        }
      }
    ],
    resonanceTriggers: ["memory", "crew", "void"],
    instability: 5
  }
};
