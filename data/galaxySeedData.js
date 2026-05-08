export const DEFAULT_SECTORS = {
  solace_drift: {
    id: "solace_drift",
    name: "Solace Drift",
    controller: "independents",
    stability: 62,
    wealth: 45,
    law: 38,
    corruption: 22,
    voidPressure: 4,
    populationPressure: 35,
    conflict: 18,
    resources: ["food", "scrap", "medicine"],
    tags: ["frontier", "trade"]
  },
  karth_veil: {
    id: "karth_veil",
    name: "Karth Veil",
    controller: "pirates",
    stability: 34,
    wealth: 38,
    law: 12,
    corruption: 62,
    voidPressure: 12,
    populationPressure: 44,
    conflict: 55,
    resources: ["weapons", "contraband", "fuel"],
    tags: ["pirate", "danger"]
  },
  navar_anchor: {
    id: "navar_anchor",
    name: "Navar Anchor",
    controller: "navy",
    stability: 72,
    wealth: 58,
    law: 82,
    corruption: 18,
    voidPressure: 3,
    populationPressure: 28,
    conflict: 22,
    resources: ["security", "fuel", "ship_parts"],
    tags: ["navy", "checkpoint"]
  },
  hollow_reef: {
    id: "hollow_reef",
    name: "Hollow Reef",
    controller: "miners",
    stability: 48,
    wealth: 62,
    law: 25,
    corruption: 30,
    voidPressure: 18,
    populationPressure: 51,
    conflict: 31,
    resources: ["ore", "crystals", "industrial"],
    tags: ["mining", "asteroid"]
  },
  eidolon_wake: {
    id: "eidolon_wake",
    name: "Eidolon Wake",
    controller: "none",
    stability: 18,
    wealth: 12,
    law: 0,
    corruption: 74,
    voidPressure: 66,
    populationPressure: 5,
    conflict: 12,
    resources: ["artifacts", "signals"],
    tags: ["void", "architect", "forbidden"]
  }
};

export const DEFAULT_ROUTES = {
  solace_to_karth: {
    id: "solace_to_karth",
    from: "solace_drift",
    to: "karth_veil",
    stability: 45,
    traffic: 36,
    piracy: 58,
    blockade: 0,
    voidPressure: 10,
    hidden: false,
    tags: ["trade", "pirate_risk"]
  },
  solace_to_navar: {
    id: "solace_to_navar",
    from: "solace_drift",
    to: "navar_anchor",
    stability: 74,
    traffic: 65,
    piracy: 14,
    blockade: 12,
    voidPressure: 3,
    hidden: false,
    tags: ["navy", "trade"]
  },
  karth_to_hollow: {
    id: "karth_to_hollow",
    from: "karth_veil",
    to: "hollow_reef",
    stability: 38,
    traffic: 41,
    piracy: 52,
    blockade: 0,
    voidPressure: 16,
    hidden: false,
    tags: ["industrial", "smuggler"]
  },
  hollow_to_eidolon: {
    id: "hollow_to_eidolon",
    from: "hollow_reef",
    to: "eidolon_wake",
    stability: 22,
    traffic: 5,
    piracy: 18,
    blockade: 0,
    voidPressure: 58,
    hidden: true,
    tags: ["void", "forbidden", "artifact"]
  }
};

export const DEFAULT_FACTIONS = {
  navy: {
    id: "navy",
    name: "Navy Authority",
    power: 70,
    aggression: 42,
    wealth: 60,
    legitimacy: 64,
    corruption: 18,
    goals: ["stabilize_routes", "suppress_pirates", "control_artifacts"],
    relations: { pirates: -80, independents: 20, miners: 25, smugglers: -35 }
  },
  pirates: {
    id: "pirates",
    name: "Free Raider Clans",
    power: 48,
    aggression: 72,
    wealth: 34,
    legitimacy: 12,
    corruption: 66,
    goals: ["expand_raids", "capture_routes", "sell_artifacts"],
    relations: { navy: -80, independents: -25, miners: -20, smugglers: 35 }
  },
  independents: {
    id: "independents",
    name: "Independent Worlds",
    power: 42,
    aggression: 18,
    wealth: 45,
    legitimacy: 58,
    corruption: 24,
    goals: ["survive", "trade", "avoid_war"],
    relations: { navy: 20, pirates: -25, miners: 30, smugglers: 5 }
  },
  miners: {
    id: "miners",
    name: "Industrial Mining Guilds",
    power: 46,
    aggression: 25,
    wealth: 68,
    legitimacy: 45,
    corruption: 28,
    goals: ["secure_resources", "keep_routes_open", "buy_security"],
    relations: { navy: 25, pirates: -20, independents: 30, smugglers: 10 }
  },
  smugglers: {
    id: "smugglers",
    name: "Black Route Syndicates",
    power: 35,
    aggression: 38,
    wealth: 50,
    legitimacy: 8,
    corruption: 72,
    goals: ["open_hidden_routes", "profit_from_shortages", "avoid_crackdowns"],
    relations: { navy: -35, pirates: 35, independents: 5, miners: 10 }
  }
};

export const DEFAULT_MARKETS = {
  food: { basePrice: 12, volatility: 0.12 },
  fuel: { basePrice: 30, volatility: 0.18 },
  medicine: { basePrice: 42, volatility: 0.22 },
  ore: { basePrice: 24, volatility: 0.15 },
  weapons: { basePrice: 90, volatility: 0.35 },
  artifacts: { basePrice: 400, volatility: 0.55 },
  contraband: { basePrice: 150, volatility: 0.45 },
  ship_parts: { basePrice: 68, volatility: 0.2 }
};
