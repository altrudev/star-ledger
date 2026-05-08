export const ENCOUNTER_TABLES = {
  travel: [
    {
      id: "pirate_intercept",
      title: "Pirate Intercept",
      weight: 12,
      minDanger: 3,
      tags: ["pirate", "combat", "negotiation"],
      intro: "A transponder ghost resolves into a raider hull cutting across your vector.",
      options: ["hail", "evade", "scan", "prepare_weapons", "bribe"]
    },
    {
      id: "false_distress_call",
      title: "False Distress Call",
      weight: 10,
      minDanger: 2,
      tags: ["deception", "pirate", "crew_check"],
      intro: "A looping distress call bleeds through the comms. The signal timing is too clean.",
      options: ["answer", "ignore", "triangulate", "send_probe"]
    },
    {
      id: "navy_checkpoint",
      title: "Navy Checkpoint",
      weight: 9,
      minDanger: 1,
      tags: ["navy", "inspection", "reputation"],
      intro: "A patrol beacon orders you to cut thrust and submit cargo telemetry.",
      options: ["comply", "forge_manifest", "run_silent", "call_contact"]
    },
    {
      id: "void_static",
      title: "Void Static",
      weight: 5,
      minDanger: 4,
      tags: ["void", "artifact_reaction", "psychological"],
      intro: "Every screen on the ship shows a slightly different version of the same impossible star.",
      options: ["wake_crew", "isolate_systems", "use_artifact", "push_through"]
    },
    {
      id: "derelict_cache",
      title: "Derelict Cache",
      weight: 8,
      minDanger: 2,
      tags: ["salvage", "risk_reward"],
      intro: "A dead cargo spine tumbles through the route, still broadcasting an old claim seal.",
      options: ["board", "scan", "mark_for_later", "strip_fast"]
    },
    {
      id: "architect_echo",
      title: "Architect Echo",
      weight: 4,
      minDanger: 1,
      tags: ["architect", "lore", "artifact_reaction"],
      intro: "A silent geometric pulse unfolds ahead, as if the route remembers being built.",
      options: ["observe", "map_pattern", "approach", "wake_architect_artifact"]
    },
    {
      id: "black_market_courier",
      title: "Black Market Courier",
      weight: 7,
      minDanger: 2,
      tags: ["smuggler", "economy", "choice"],
      intro: "A courier ship pings you with a private buy-order encrypted through old syndicate keys.",
      options: ["trade", "refuse", "betray_to_navy", "negotiate"]
    }
  ]
};

export const ENCOUNTER_PHASES = ["intro", "negotiation", "escalation", "resolution", "aftermath"];
