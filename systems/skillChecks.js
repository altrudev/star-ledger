import { clamp } from "./rng.js";

export function resolveCheck({ check, playerState = {}, ship = {}, crew = [], rng = Math.random }) {
  if (!check) return { attempted: false, success: true, roll: null, total: null, dc: null };

  const roll = 1 + Math.floor(rng() * 12);
  let bonus = 0;

  if (check.skill) bonus += bestCrewSkill(crew, check.skill);
  if (check.shipStat) bonus += ship.stats?.[check.shipStat] ?? 0;
  if (check.playerStat) bonus += playerState.stats?.[check.playerStat] ?? 0;

  const total = roll + bonus;
  return {
    attempted: true,
    success: total >= check.dc,
    roll,
    bonus,
    total,
    dc: check.dc,
    margin: total - check.dc
  };
}

export function bestCrewSkill(crew, skill) {
  return Math.max(0, ...crew.map(c => c.skills?.[skill] ?? 0));
}

export function optionIsAvailable(option, context) {
  if (option.requiresTag && !context.tags?.includes(option.requiresTag)) {
    const hasArtifact = (context.playerState.artifacts ?? []).some(a => a.active || a.tags?.includes(option.requiresTag));
    if (!hasArtifact) return false;
  }

  if (option.requiresReputation) {
    const rep = context.playerState.reputation?.[option.requiresReputation.faction] ?? 0;
    if (rep < option.requiresReputation.min) return false;
  }

  if (option.cost?.credits && (context.playerState.resources?.credits ?? 0) < option.cost.credits) return false;
  return true;
}

export function computeTensionDelta(option, checkResult) {
  let delta = option.tension ?? 0;
  if (checkResult?.attempted && !checkResult.success) delta += option.failureTension ?? 1;
  if (checkResult?.attempted && checkResult.success) delta += option.successTension ?? 0;
  return clamp(delta, -4, 4);
}
