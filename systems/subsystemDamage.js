import { clamp } from "./rng.js";
import { SHIP_SUBSYSTEMS } from "../data/subsystemDefinitions.js";

export function applySubsystemDamage(ship, subsystemId, amount = 0) {
  const subsystem = ship.subsystems?.[subsystemId];
  if (!subsystem) return ship;

  const integrity = clamp(subsystem.integrity - amount, 0, 100);

  return {
    ...ship,
    subsystems: {
      ...ship.subsystems,
      [subsystemId]: {
        ...subsystem,
        integrity
      }
    }
  };
}

export function evaluateSubsystemEffects(ship) {
  const effects = [];

  for (const [id, state] of Object.entries(ship.subsystems ?? {})) {
    const def = SHIP_SUBSYSTEMS[id];
    if (!def) continue;

    if (state.integrity <= def.criticalThreshold) {
      effects.push(...(def.effects.critical ?? []));
    } else if (state.integrity <= def.criticalThreshold + 20) {
      effects.push(...(def.effects.lowIntegrity ?? []));
    }
  }

  return effects;
}
