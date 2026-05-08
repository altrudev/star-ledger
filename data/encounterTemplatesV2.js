export const ENCOUNTER_TEMPLATES_V2 = {
  pirate_vector_trap: {
    id: "pirate_vector_trap",
    title: "Vector Trap",
    faction: "pirates",
    tags: ["pirate", "combat", "negotiation"],
    opening: "A pirate beacon does not chase you. It waits exactly where your safest evasion burn should be.",
    startingTension: 5,
    options: {
      intro: [
        { id: "hail", label: "Open Hail", nextPhase: "negotiation", tension: -1 },
        { id: "scan", label: "Run Combat Scan", check: { skill: "science", dc: 9 }, nextPhase: "negotiation", successFlag: "scan_advantage", failureTension: 1 },
        { id: "hard_burn", label: "Hard Burn Away", check: { shipStat: "engines", dc: 10 }, nextPhase: "resolution", successOutcome: "escape_clean", failureOutcome: "engine_stress" },
        { id: "silent_drift", label: "Silent Drift", check: { shipStat: "stealth", dc: 9 }, nextPhase: "negotiation", successFlag: "position_hidden", failureTension: 2 }
      ],
      negotiation: [
        { id: "pay_toll", label: "Pay Toll", cost: { credits: 80 }, nextPhase: "resolution", outcome: "paid_toll" },
        { id: "bluff_navy", label: "Bluff Navy Pursuit", check: { skill: "deception", dc: 10 }, nextPhase: "resolution", successOutcome: "pirates_back_down", failureTension: 2 },
        { id: "intimidate", label: "Threaten Retaliation", check: { skill: "command", dc: 11 }, nextPhase: "escalation", successFlag: "pirate_hesitation", failureTension: 2 },
        { id: "prepare_boarding", label: "Prepare Boarding Counter", nextPhase: "escalation", tension: 1, flag: "boarding_ready" }
      ],
      escalation: [
        { id: "disable_engines", label: "Target Their Engines", check: { shipStat: "weapons", dc: 11 }, nextPhase: "resolution", successOutcome: "disabled_raider", failureOutcome: "exchange_damage" },
        { id: "surrender_cargo", label: "Surrender Partial Cargo", cost: { cargoHeat: -1 }, nextPhase: "resolution", outcome: "cargo_lost" },
        { id: "artifact_pulse", label: "Trigger Artifact Pulse", requiresTag: "artifact_reaction", nextPhase: "resolution", outcome: "artifact_intimidation", corruption: 1 },
        { id: "retreat", label: "Retreat Under Fire", check: { shipStat: "engines", dc: 12 }, nextPhase: "resolution", successOutcome: "escaped_damaged", failureOutcome: "forced_combat" }
      ]
    },
    outcomes: {
      escape_clean: "You shear out of the trap before their targeting solution locks.",
      engine_stress: "The hard burn tears through the engine tolerances. You escape, but the drive complains for the next hour.",
      paid_toll: "The pirates accept payment and vanish without ceremony.",
      pirates_back_down: "The bluff lands. The raider breaks vector first.",
      disabled_raider: "Your volley cripples their engine bloom. The pirate ship tumbles out of pursuit.",
      exchange_damage: "Both ships trade fire. You survive, but the hull records the argument.",
      cargo_lost: "The pirates take enough to remember you, not enough to kill you.",
      artifact_intimidation: "The artifact pulse bends every comm channel into a single scream. The pirates disengage.",
      escaped_damaged: "You escape through weapons fire, trailing heat and bad luck.",
      forced_combat: "The route collapses into open combat."
    }
  },

  navy_black_inspection: {
    id: "navy_black_inspection",
    title: "Black Inspection",
    faction: "navy",
    tags: ["navy", "inspection", "corruption"],
    opening: "A Navy vessel without registry lights orders you to submit to a silent inspection.",
    startingTension: 4,
    options: {
      intro: [
        { id: "comply", label: "Comply", nextPhase: "negotiation", tension: -1 },
        { id: "challenge_authority", label: "Challenge Authority", check: { skill: "protocol", dc: 9 }, nextPhase: "negotiation", successFlag: "legal_ground", failureTension: 2 },
        { id: "spoof_manifest", label: "Spoof Cargo Manifest", check: { skill: "deception", dc: 10 }, nextPhase: "negotiation", successFlag: "manifest_clean", failureTension: 2 },
        { id: "run", label: "Run", check: { shipStat: "engines", dc: 12 }, nextPhase: "resolution", successOutcome: "escaped_checkpoint", failureOutcome: "flagged_by_navy" }
      ],
      negotiation: [
        { id: "call_contact", label: "Call in Contact", requiresReputation: { faction: "navy", min: 35 }, nextPhase: "resolution", outcome: "contact_clears_you" },
        { id: "offer_bribe", label: "Offer Quiet Bribe", cost: { credits: 120 }, nextPhase: "resolution", outcome: "bribe_accepted" },
        { id: "submit_partial", label: "Submit Partial Logs", nextPhase: "resolution", outcome: "partial_log_review" },
        { id: "accuse_corruption", label: "Accuse Them of Corruption", check: { skill: "command", dc: 12 }, nextPhase: "resolution", successOutcome: "inspection_aborts", failureOutcome: "inspection_escalates" }
      ]
    },
    outcomes: {
      escaped_checkpoint: "You outrun the inspection, but the route behind you lights with warnings.",
      flagged_by_navy: "The patrol tags your signature before you break contact.",
      contact_clears_you: "A tired voice on a secure channel clears your ship with one sentence.",
      bribe_accepted: "The silent inspection becomes a silent transaction.",
      partial_log_review: "They take just enough telemetry to become a future problem.",
      inspection_aborts: "The officer cuts the channel. Their ship turns away first.",
      inspection_escalates: "The accusation hits something real. Their weapons wake up."
    }
  },

  void_memory_skip: {
    id: "void_memory_skip",
    title: "Memory Skip",
    faction: "void",
    tags: ["void", "psychological", "crew", "artifact_reaction"],
    opening: "The ship clock jumps forward nine minutes. Everyone remembers a different route.",
    startingTension: 7,
    options: {
      intro: [
        { id: "compare_memories", label: "Compare Crew Memories", check: { skill: "science", dc: 11 }, nextPhase: "negotiation", successFlag: "memory_pattern", failureTension: 1 },
        { id: "isolate_systems", label: "Isolate Ship Systems", check: { shipStat: "systems", dc: 10 }, nextPhase: "negotiation", successFlag: "systems_isolated", failureTension: 1 },
        { id: "trust_navigation", label: "Trust Current Navigation", nextPhase: "resolution", outcome: "arrive_wrong" },
        { id: "wake_artifact", label: "Wake Architect Artifact", requiresTag: "artifact_reaction", nextPhase: "escalation", flag: "artifact_awake", corruption: 1 }
      ],
      negotiation: [
        { id: "reconstruct_path", label: "Reconstruct True Path", check: { skill: "science", dc: 12 }, nextPhase: "resolution", successOutcome: "true_path_restored", failureOutcome: "route_scarred" },
        { id: "erase_last_minutes", label: "Erase Last Nine Minutes", nextPhase: "resolution", outcome: "memory_sealed", crewStress: 1 },
        { id: "follow_false_star", label: "Follow the False Star", nextPhase: "escalation", tension: 2, flag: "false_star_followed" }
      ],
      escalation: [
        { id: "cut_power", label: "Cut Main Power", check: { shipStat: "systems", dc: 12 }, nextPhase: "resolution", successOutcome: "void_signal_starved", failureOutcome: "crew_memory_damage" },
        { id: "let_it_speak", label: "Let It Speak", nextPhase: "resolution", outcome: "void_revelation", corruption: 2 }
      ]
    },
    outcomes: {
      arrive_wrong: "You arrive somewhere adjacent to the destination. The charts insist this is impossible.",
      true_path_restored: "The route snaps back into a shape the ship can survive.",
      route_scarred: "You recover the path, but the route remembers your passage incorrectly.",
      memory_sealed: "The missing minutes become a locked room in everyone’s mind.",
      void_signal_starved: "The darkness loses its grip when the ship goes cold.",
      crew_memory_damage: "One crew member forgets a name they should not have been able to forget.",
      void_revelation: "The signal speaks in the grammar of extinction. Something in the galaxy updates."
    }
  },

  architect_lane_unfolding: {
    id: "architect_lane_unfolding",
    title: "Lane Unfolding",
    faction: "architect",
    tags: ["architect", "discovery", "artifact_reaction"],
    opening: "A hidden Architect vector unfolds ahead, not as a path, but as an instruction.",
    startingTension: 3,
    options: {
      intro: [
        { id: "observe", label: "Observe Pattern", check: { skill: "science", dc: 8 }, nextPhase: "negotiation", successFlag: "pattern_mapped", failureTension: 1 },
        { id: "enter_lane", label: "Enter the Lane", check: { shipStat: "systems", dc: 10 }, nextPhase: "resolution", successOutcome: "hidden_route_unlocked", failureOutcome: "lane_rejects_ship" },
        { id: "record_only", label: "Record Only", nextPhase: "resolution", outcome: "partial_coordinates" },
        { id: "resonate_artifact", label: "Resonate Artifact", requiresTag: "artifact_reaction", nextPhase: "resolution", outcome: "archive_echo", corruption: 0 }
      ],
      negotiation: [
        { id: "solve_instruction", label: "Solve the Instruction", check: { skill: "xenoarchaeology", dc: 11 }, nextPhase: "resolution", successOutcome: "architect_secret", failureOutcome: "pattern_fades" },
        { id: "mark_for_later", label: "Mark for Later", nextPhase: "resolution", outcome: "route_marker_created" }
      ]
    },
    outcomes: {
      hidden_route_unlocked: "The galaxy grows a new line on your map.",
      lane_rejects_ship: "The lane folds away, leaving your systems hot and embarrassed.",
      partial_coordinates: "You capture incomplete coordinates. Enough to know something is missing.",
      archive_echo: "An artifact answers. For a moment, the ship is inside someone else’s memory of the route.",
      architect_secret: "The instruction resolves into a place-name older than your species.",
      pattern_fades: "The route becomes ordinary again, which somehow feels worse.",
      route_marker_created: "The vector is marked. It may unfold again under better conditions."
    }
  }
};
