export const LIGHT_TRAVEL_DECISIONS = [
  {
    id: "weak_signal_ping",
    title: "Weak Signal Ping",
    text: "Sensors catch a weak encrypted ping off the main vector.",
    tags: ["signal","discovery"],
    weight: 8,
    options: [
      { id: "ignore", label: "Ignore", effects: { time: 0, risk: 0 } },
      { id: "scan", label: "Passive Scan", effects: { time: 1, discoveryChance: 0.18 } },
      { id: "investigate", label: "Investigate", effects: { time: 2, risk: 1, discoveryChance: 0.35 } }
    ]
  },
  {
    id: "debris_shadow",
    title: "Debris Shadow",
    text: "A sparse debris field could hide your signature, but it will slow approach.",
    tags: ["stealth","debris"],
    weight: 7,
    options: [
      { id: "maintain", label: "Maintain Course", effects: {} },
      { id: "hide", label: "Hide in Debris", effects: { time: 1, risk: -1, fuel: -1 } },
      { id: "fast_burn", label: "Fast Burn Through", effects: { time: -1, risk: 1, fuel: -2 } }
    ]
  },
  {
    id: "void_pressure_wave",
    title: "Pressure Wave",
    text: "A spatial pressure wave crosses your route. It is not moving like weather.",
    tags: ["void","navigation"],
    weight: 4,
    options: [
      { id: "ride_edge", label: "Ride the Edge", effects: { time: -1, risk: 2, corruption: 1 } },
      { id: "reroute", label: "Reroute", effects: { time: 2, risk: -1, fuel: -1 } },
      { id: "power_down", label: "Power Down", effects: { time: 1, risk: -2, crewStress: 1 } }
    ]
  },
  {
    id: "crew_dispute",
    title: "Crew Dispute",
    text: "Two crew members disagree over the safest approach vector.",
    tags: ["crew"],
    weight: 6,
    options: [
      { id: "captain_decides", label: "Captain Decides", effects: { crewStress: 1 } },
      { id: "trust_navigator", label: "Trust Navigator", effects: { discoveryChance: 0.12 } },
      { id: "take_vote", label: "Take a Vote", effects: { time: 1, crewStress: -1 } }
    ]
  }
];
