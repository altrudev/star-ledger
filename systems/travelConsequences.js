export function applyTravelEffects(state, effects = {}) {
  const next = {
    ...state,
    resources: { ...(state.resources ?? {}) },
    crewState: { ...(state.crewState ?? {}) },
    routeRiskMod: state.routeRiskMod ?? 0,
    corruption: state.corruption ?? 0,
    discoveries: [...(state.discoveries ?? [])]
  };

  if (effects.fuel) next.resources.fuel = (next.resources.fuel ?? 0) + effects.fuel;
  if (effects.credits) next.resources.credits = (next.resources.credits ?? 0) + effects.credits;
  if (effects.risk) next.routeRiskMod += effects.risk;
  if (effects.corruption) next.corruption += effects.corruption;
  if (effects.crewStress) next.crewState.stress = (next.crewState.stress ?? 0) + effects.crewStress;

  if (effects.discoveryId && !next.discoveries.includes(effects.discoveryId)) {
    next.discoveries.push(effects.discoveryId);
  }

  return next;
}

export function resolveLightDecision(choice, context = {}) {
  const effects = { ...(choice.effects ?? {}) };
  const rng = context.rng ?? Math.random;

  if (effects.discoveryChance && rng() < effects.discoveryChance) {
    effects.discoveryId = context.discoveryId ?? `route_secret_${Math.floor(rng() * 10000)}`;
  }

  return {
    outcome: effects.discoveryId ? "The decision reveals something worth marking on the route map." : "The ship continues through the dark.",
    effects
  };
}
