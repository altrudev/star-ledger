export const WORLD_EVENT_TEMPLATES = [
  {
    id: "navy_crackdown",
    title: "Navy Crackdown",
    tags: ["navy", "law", "routes"],
    weight: 8,
    conditions: { minPiracy: 45 },
    effects: {
      sector: { law: 8, stability: 3, corruption: 2 },
      route: { blockade: 12, piracy: -8 },
      faction: { navy: { legitimacy: 2 }, smugglers: { power: -1 } }
    },
    rumor: "Navy checkpoints are multiplying across the route grid."
  },
  {
    id: "pirate_surge",
    title: "Pirate Surge",
    tags: ["pirate", "conflict"],
    weight: 9,
    conditions: { maxLaw: 45 },
    effects: {
      sector: { stability: -6, law: -4, corruption: 5, conflict: 7 },
      route: { piracy: 14, traffic: -8 },
      faction: { pirates: { power: 2, wealth: 2 } }
    },
    rumor: "Raider clans are coordinating. That is never accidental."
  },
  {
    id: "mining_strike",
    title: "Mining Strike",
    tags: ["miners", "economy"],
    weight: 6,
    conditions: { resource: "ore" },
    effects: {
      sector: { wealth: -5, stability: -4, populationPressure: 5 },
      market: { ore: 0.22, ship_parts: 0.14 }
    },
    rumor: "Guild miners have shut down output until security improves."
  },
  {
    id: "void_storm",
    title: "Void Storm",
    tags: ["void", "psychological", "route"],
    weight: 4,
    conditions: { minVoidPressure: 25 },
    effects: {
      sector: { voidPressure: 10, stability: -8, populationPressure: 4 },
      route: { voidPressure: 12, stability: -10, traffic: -12 },
      market: { artifacts: 0.2, medicine: 0.12 }
    },
    rumor: "Ships are arriving with crews who remember different destinations."
  },
  {
    id: "architect_wake",
    title: "Architect Wake",
    tags: ["architect", "discovery"],
    weight: 3,
    conditions: { tag: "architect" },
    effects: {
      sector: { wealth: 8, conflict: 5, voidPressure: 3 },
      route: { stability: 5 },
      market: { artifacts: 0.35 }
    },
    rumor: "A structure older than maps has begun emitting clean geometry."
  },
  {
    id: "refugee_flow",
    title: "Refugee Flow",
    tags: ["humanitarian", "population"],
    weight: 7,
    conditions: { minConflict: 45 },
    effects: {
      sector: { populationPressure: 10, stability: -3, wealth: -2 },
      route: { traffic: 8, piracy: 4 },
      market: { food: 0.18, medicine: 0.2 }
    },
    rumor: "Civilian caravans are leaving the unstable sectors in waves."
  },
  {
    id: "black_market_boom",
    title: "Black Market Boom",
    tags: ["smuggler", "economy"],
    weight: 6,
    conditions: { minCorruption: 45 },
    effects: {
      sector: { wealth: 4, corruption: 6, law: -3 },
      route: { traffic: 4, piracy: 3 },
      market: { contraband: -0.15, weapons: 0.12 }
    },
    rumor: "The black markets are buying anything with a serial number scratched off."
  }
];
