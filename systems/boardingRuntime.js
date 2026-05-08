import { clamp } from "./rng.js";

export function evaluateBoardingState(state) {
  const attacker = state.attacker;
  const defender = state.defender;

  return {
    active: state.boardingActive,
    corridorCombat: state.corridorCombat,
    attackerBoarding: attacker.boardingProgress,
    defenderResistance: defender.morale,
    decompressionRisk: defender.decompression,
    breachCritical:
      defender.decompression >= 70 ||
      defender.subsystems.life_support.integrity <= 15
  };
}

export function triggerBoardingClampImpact(state) {
  const next = { ...state };

  next.logs = [
    ...(next.logs ?? []),
    {
      system: true,
      text: "Boarding clamps lock against the enemy hull."
    }
  ];

  next.boardingActive = true;
  return next;
}

export function resolveDecompressionTick(ship) {
  const severity = ship.decompression ?? 0;

  if (severity < 20) return ship;

  return {
    ...ship,
    morale: clamp((ship.morale ?? 50) - Math.round(severity * 0.03), 0, 100),
    crewCasualties:
      ship.crewCasualties + Math.max(0, Math.round(severity * 0.02))
  };
}
