export const CREW_CONFLICT_EVENTS = [
  {
    id: "navigation_dispute",
    title: "Navigation Dispute",
    text: "Two crew members disagree over the safest vector. The argument is technical, then personal.",
    tags: ["travel", "conflict", "navigation"],
    weight: 8,
    minStress: 3,
    options: [
      { id: "captain_rules", label: "Captain Rules", effects: { stress: 1, loyalty: -1 } },
      { id: "mediate", label: "Mediate", check: { skill: "command", dc: 9 }, effects: { stress: -1, loyalty: 1 } },
      { id: "trust_specialist", label: "Trust Specialist", effects: { specialistXp: 1, loyalty: 1 } }
    ]
  },
  {
    id: "contraband_discovered",
    title: "Contraband Discovered",
    text: "A hidden package turns up behind a maintenance panel. Nobody claims it.",
    tags: ["ship", "smuggling", "trust"],
    weight: 5,
    minStress: 2,
    options: [
      { id: "destroy", label: "Destroy It", effects: { loyalty: 1, credits: 0 } },
      { id: "sell", label: "Sell It Later", effects: { credits: 120, stress: 1, cargoHeat: 1 } },
      { id: "investigate", label: "Investigate Owner", check: { skill: "streetwise", dc: 10 }, effects: { revealAgendaChance: 0.25 } }
    ]
  },
  {
    id: "void_nightmare",
    title: "Void Nightmare",
    text: "A crew member wakes the ship by screaming coordinates they have never seen.",
    tags: ["void", "trauma", "psychological"],
    weight: 4,
    minStress: 4,
    options: [
      { id: "sedate", label: "Sedate Them", effects: { stress: -1, loyalty: -1, trauma: 1 } },
      { id: "listen", label: "Listen Carefully", effects: { stress: 1, discoveryChance: 0.2 } },
      { id: "isolate", label: "Isolate Quarters", effects: { stress: 0, loyalty: -2 } }
    ]
  },
  {
    id: "quiet_confession",
    title: "Quiet Confession",
    text: "During low watch, a crew member admits they almost left at the last port.",
    tags: ["loyalty", "ship_life"],
    weight: 6,
    minStress: 3,
    options: [
      { id: "promise_share", label: "Promise a Bigger Share", effects: { loyalty: 2, credits: -60 } },
      { id: "honest_talk", label: "Have an Honest Talk", effects: { loyalty: 1, stress: -1 } },
      { id: "dismiss", label: "Dismiss Concern", effects: { loyalty: -2, stress: 1 } }
    ]
  }
];

export const CREW_TRAUMA_TYPES = {
  void_touched: {
    name: "Void-Touched",
    description: "Receives occasional warnings, but suffers stress faster near Void sectors.",
    modifiers: { voidInsight: 1, stressFromVoid: 1 }
  },
  combat_shaken: {
    name: "Combat-Shaken",
    description: "Less reliable in firefights until stabilized.",
    modifiers: { combatPenalty: 1 }
  },
  distrustful: {
    name: "Distrustful",
    description: "Loyalty gains are reduced until a personal event resolves.",
    modifiers: { loyaltyGainPenalty: 1 }
  },
  obsessed: {
    name: "Obsessed",
    description: "Gains science/xenoarchaeology faster, but may push dangerous choices.",
    modifiers: { researchXpBonus: 1, riskPreference: 1 }
  }
};
