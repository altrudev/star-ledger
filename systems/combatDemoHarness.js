import { createCombatState } from "./combatState.js";
import { applyCombatAction } from "./combatResolver.js";
import { SHIP_COMBAT_ACTIONS } from "../data/combatActions.js";

export function runCombatDemo() {
  let state = createCombatState({
    attacker: {
      id: "player_ship",
      name: "ISS Revenant",
      faction: "independent"
    },
    defender: {
      id: "pirate_raider",
      name: "Rust Fang",
      faction: "pirates"
    }
  });

  state = applyCombatAction(
    state,
    "attacker",
    SHIP_COMBAT_ACTIONS.find(a => a.id === "precision_fire"),
    "engines"
  );

  state = applyCombatAction(
    state,
    "attacker",
    SHIP_COMBAT_ACTIONS.find(a => a.id === "boarding_clamps"),
    "life_support"
  );

  state = applyCombatAction(
    state,
    "attacker",
    SHIP_COMBAT_ACTIONS.find(a => a.id === "breach_charge"),
    "life_support"
  );

  return state;
}
