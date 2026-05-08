export const DISCOVERY_ARCHETYPES = {
  anomaly: [
    {
      id: "gravitic_echo",
      name: "Gravitic Echo",
      tags: ["anomaly", "gravity", "science"],
      weight: 8,
      risk: 3,
      rewards: ["route_data", "science_xp"],
      text: "A repeating gravity ripple marks the route like a heartbeat."
    },
    {
      id: "false_star_signature",
      name: "False Star Signature",
      tags: ["void", "signal", "psychological"],
      weight: 5,
      risk: 6,
      rewards: ["void_lore", "corruption"],
      text: "A star appears in the wrong place, burning with no mass behind it."
    },
    {
      id: "architect_frequency_knot",
      name: "Architect Frequency Knot",
      tags: ["architect", "signal", "hidden_route"],
      weight: 4,
      risk: 4,
      rewards: ["hidden_route", "architect_lore"],
      text: "A clean geometric signal folds through normal space."
    }
  ],

  ruin: [
    {
      id: "dead_relay_station",
      name: "Dead Relay Station",
      tags: ["ruin", "relay", "salvage"],
      weight: 8,
      risk: 3,
      rewards: ["scrap", "signal_fragment"],
      text: "A relay station hangs dead, its antennae aimed at a sector that no longer exists."
    },
    {
      id: "fractured_gate_ring",
      name: "Fractured Gate Ring",
      tags: ["architect", "ruin", "gate"],
      weight: 4,
      risk: 6,
      rewards: ["hidden_route", "artifact_clue"],
      text: "A broken gate arc floats in pieces, still trying to complete a circle."
    },
    {
      id: "war_cemetery",
      name: "War Cemetery",
      tags: ["battlefield", "salvage", "history"],
      weight: 6,
      risk: 4,
      rewards: ["weapons", "faction_lore"],
      text: "Hundreds of cold hulls drift in formation, as if the battle ended by command."
    }
  ],

  salvage: [
    {
      id: "abandoned_cargo_spine",
      name: "Abandoned Cargo Spine",
      tags: ["salvage", "trade"],
      weight: 10,
      risk: 2,
      rewards: ["cargo", "credits"],
      text: "A cargo spine tumbles slowly, its claim beacon long expired."
    },
    {
      id: "sealed_lifeboat",
      name: "Sealed Lifeboat",
      tags: ["crew", "humanitarian", "mystery"],
      weight: 6,
      risk: 3,
      rewards: ["crew_event", "reputation"],
      text: "A lifeboat is still powered. No heat signatures answer the hail."
    },
    {
      id: "black_box_cache",
      name: "Black Box Cache",
      tags: ["intel", "faction", "history"],
      weight: 7,
      risk: 2,
      rewards: ["rumor", "faction_memory"],
      text: "A hardened flight recorder repeats a final command in encrypted bursts."
    }
  ]
};

export const DISCOVERY_CHAIN_TEMPLATES = {
  architect_map_chain: {
    id: "architect_map_chain",
    name: "Architect Map Chain",
    stages: [
      "frequency_knot",
      "partial_coordinates",
      "dead_gate_shadow",
      "hidden_lane_unlock"
    ],
    finalReward: "hidden_architect_sector"
  },
  void_dream_chain: {
    id: "void_dream_chain",
    name: "Void Dream Chain",
    stages: [
      "false_star",
      "memory_skip",
      "choir_signal",
      "forbidden_coordinate"
    ],
    finalReward: "void_sector_access"
  },
  war_archive_chain: {
    id: "war_archive_chain",
    name: "War Archive Chain",
    stages: [
      "battlefield_black_box",
      "missing_fleet_record",
      "navy_suppression_order",
      "war_truth_revealed"
    ],
    finalReward: "faction_truth"
  }
};
