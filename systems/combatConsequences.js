export function deriveCombatOutcome(state) {
  const attacker = state.attacker;
  const defender = state.defender;

  if (defender.hull <= 0) {
    return {
      victor: attacker.id,
      outcome: "destroyed",
      salvage: true,
      reputation: 6
    };
  }

  if (defender.surrendered) {
    return {
      victor: attacker.id,
      outcome: "surrender",
      boardingAvailable: true,
      reputation: 3
    };
  }

  if (state.corridorCombat) {
    return {
      outcome: "boarding_conflict",
      transition: "ship_interior_runtime"
    };
  }

  if (attacker.hull <= 20) {
    return {
      outcome: "desperate_retreat",
      moraleLoss: 4
    };
  }

  return {
    outcome: "disengaged"
  };
}
