export const SHIP_COMBAT_ACTIONS = [
  {
    id: "precision_fire",
    label: "Precision Fire",
    phase: "engagement",
    effects: {
      hullDamage: 8,
      subsystemDamage: 6,
      tension: 1
    }
  },
  {
    id: "suppressive_barrage",
    label: "Suppressive Barrage",
    phase: "engagement",
    effects: {
      hullDamage: 5,
      moraleDamage: 4,
      boardingDefensePenalty: 2
    }
  },
  {
    id: "engine_burn",
    label: "Engine Burn",
    phase: "maneuver",
    effects: {
      evasion: 3,
      heat: 2
    }
  },
  {
    id: "boarding_clamps",
    label: "Deploy Boarding Clamps",
    phase: "boarding",
    effects: {
      boardingProgress: 5,
      hullRisk: 2,
      decompressionRisk: 1
    }
  },
  {
    id: "breach_charge",
    label: "Breach Charge",
    phase: "boarding",
    effects: {
      subsystemDamage: 4,
      decompressionRisk: 4,
      crewCasualtyRisk: 3
    }
  },
  {
    id: "reactor_overload",
    label: "Reactor Overload",
    phase: "critical",
    effects: {
      reactorStress: 6,
      tension: 5,
      selfDamage: 8
    }
  },
  {
    id: "emergency_seal",
    label: "Emergency Seal",
    phase: "damage_control",
    effects: {
      decompression: -4,
      boardingProgress: -2
    }
  },
  {
    id: "counter_intrusion",
    label: "Counter Intrusion",
    phase: "boarding",
    effects: {
      boardingProgress: -5,
      crewMorale: 2
    }
  },
  {
    id: "artifact_discharge",
    label: "Artifact Discharge",
    phase: "critical",
    effects: {
      intimidation: 6,
      corruption: 3,
      reactorStress: 2
    }
  },
  {
    id: "withdraw_vector",
    label: "Withdraw Vector",
    phase: "retreat",
    effects: {
      escapeChance: 4,
      moraleDamage: 1
    }
  }
];
