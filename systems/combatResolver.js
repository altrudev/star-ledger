import { clamp } from "./rng.js";
import { applySubsystemDamage, evaluateSubsystemEffects } from "./subsystemDamage.js";

export function applyCombatAction(state, actorSide, action, targetSubsystem = null) {
  const actor = state[actorSide];
  const targetSide = actorSide === "attacker" ? "defender" : "attacker";
  let target = state[targetSide];

  const effects = action.effects ?? {};

  if (effects.hullDamage) {
    target.hull = clamp(target.hull - effects.hullDamage, 0, 100);
  }

  if (effects.moraleDamage) {
    target.morale = clamp(target.morale - effects.moraleDamage, 0, 100);
  }

  if (effects.subsystemDamage && targetSubsystem) {
    target = applySubsystemDamage(target, targetSubsystem, effects.subsystemDamage);
  }

  if (effects.reactorStress) {
    actor.reactorStress = clamp(actor.reactorStress + effects.reactorStress, 0, 100);
  }

  if (effects.heat) {
    actor.heat = clamp(actor.heat + effects.heat, 0, 100);
  }

  if (effects.boardingProgress) {
    actor.boardingProgress = clamp(actor.boardingProgress + effects.boardingProgress, 0, 100);
  }

  if (effects.decompressionRisk) {
    target.decompression = clamp(target.decompression + effects.decompressionRisk, 0, 100);
  }

  if (effects.crewCasualtyRisk) {
    target.crewCasualties += Math.max(0, Math.round(effects.crewCasualtyRisk / 2));
  }

  const subsystemEffects = evaluateSubsystemEffects(target);

  const next = {
    ...state,
    [actorSide]: actor,
    [targetSide]: target,
    tension: clamp((state.tension ?? 0) + (effects.tension ?? 0), 0, 100),
    logs: [
      ...(state.logs ?? []),
      {
        actor: actor.name,
        action: action.label,
        targetSubsystem,
        subsystemEffects
      }
    ]
  };

  next.boardingActive =
    next.attacker.boardingProgress >= 25 ||
    next.defender.boardingProgress >= 25;

  next.corridorCombat =
    next.boardingActive &&
    (next.attacker.boardingProgress >= 60 ||
     next.defender.boardingProgress >= 60);

  next.completed =
    next.attacker.hull <= 0 ||
    next.defender.hull <= 0 ||
    next.attacker.surrendered ||
    next.defender.surrendered;

  return next;
}
