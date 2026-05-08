import { SHIP_SUBSYSTEMS } from "../data/subsystemDefinitions.js";

export function createCombatShipState(ship = {}) {
  const subsystems = {};

  for (const [id, def] of Object.entries(SHIP_SUBSYSTEMS)) {
    subsystems[id] = {
      id,
      integrity: ship.subsystems?.[id]?.integrity ?? def.maxIntegrity
    };
  }

  return {
    id: ship.id ?? "unknown_ship",
    name: ship.name ?? "Unknown Vessel",
    faction: ship.faction ?? "independent",
    hull: ship.hull ?? 100,
    morale: ship.morale ?? 50,
    heat: ship.heat ?? 0,
    reactorStress: ship.reactorStress ?? 0,
    boardingProgress: ship.boardingProgress ?? 0,
    decompression: ship.decompression ?? 0,
    crewCasualties: ship.crewCasualties ?? 0,
    surrendered: false,
    destroyed: false,
    subsystems,
    statusEffects: ship.statusEffects ?? []
  };
}

export function createCombatState({ attacker, defender }) {
  return {
    phase: "maneuver",
    round: 1,
    tension: 0,
    attacker: createCombatShipState(attacker),
    defender: createCombatShipState(defender),
    logs: [],
    corridorCombat: false,
    boardingActive: false,
    completed: false
  };
}
