import { applyArtifactCorruption } from "./artifactCorruption.js";

export function activateArtifactAbility(artifact, abilityId, context = {}) {
  const ability = (artifact.activeAbilities ?? []).find(a => a.id === abilityId);
  if (!ability) {
    return {
      success: false,
      reason: "Ability not found."
    };
  }

  const cooldown = artifact.cooldowns?.[abilityId] ?? 0;
  if (cooldown > 0) {
    return {
      success: false,
      reason: `Cooldown active (${cooldown}).`
    };
  }

  let next = applyArtifactCorruption(artifact, ability.corruption ?? 0);

  next.cooldowns = {
    ...(next.cooldowns ?? {}),
    [abilityId]: ability.cooldown
  };

  next.exposure = (next.exposure ?? 0) + 1;

  return {
    success: true,
    artifact: next,
    ability,
    effect: ability.effect,
    text: `${artifact.name} activates: ${ability.name}`
  };
}

export function tickArtifactCooldowns(artifact) {
  const nextCooldowns = {};

  for (const [k, v] of Object.entries(artifact.cooldowns ?? {})) {
    nextCooldowns[k] = Math.max(0, v - 1);
  }

  return {
    ...artifact,
    cooldowns: nextCooldowns
  };
}
