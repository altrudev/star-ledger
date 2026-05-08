export function applyEncounterOutcome(playerState, outcome) {
  const next = {
    ...playerState,
    resources: { ...(playerState.resources ?? {}) },
    reputation: { ...(playerState.reputation ?? {}) },
    crewState: { ...(playerState.crewState ?? {}) },
    flags: { ...(playerState.flags ?? {}) },
    discoveries: [...(playerState.discoveries ?? [])],
    corruption: playerState.corruption ?? 0,
    wantedLevel: playerState.wantedLevel ?? 0,
    cargoHeat: playerState.cargoHeat ?? 0
  };

  for (const [k, v] of Object.entries(outcome.cost ?? {})) {
    if (k === "credits") next.resources.credits = (next.resources.credits ?? 0) - v;
    if (k === "fuel") next.resources.fuel = (next.resources.fuel ?? 0) - v;
    if (k === "cargoHeat") next.cargoHeat += v;
  }

  if (outcome.corruption) next.corruption += outcome.corruption;
  if (outcome.crewStress) next.crewState.stress = (next.crewState.stress ?? 0) + outcome.crewStress;
  if (outcome.wantedDelta) next.wantedLevel += outcome.wantedDelta;

  if (outcome.reputation) {
    for (const [faction, delta] of Object.entries(outcome.reputation)) {
      next.reputation[faction] = (next.reputation[faction] ?? 0) + delta;
    }
  }

  if (outcome.discoveryId && !next.discoveries.includes(outcome.discoveryId)) {
    next.discoveries.push(outcome.discoveryId);
  }

  for (const flag of outcome.flags ?? []) next.flags[flag] = true;

  return next;
}

export function buildOutcomePayload(template, outcomeId, option = {}) {
  const payload = {
    id: outcomeId,
    text: template.outcomes?.[outcomeId] ?? "The encounter resolves into consequence.",
    cost: option.cost ?? {},
    corruption: option.corruption ?? 0,
    crewStress: option.crewStress ?? 0,
    flags: []
  };

  if (outcomeId === "pirates_back_down") payload.reputation = { pirates: -2 };
  if (outcomeId === "disabled_raider") payload.reputation = { pirates: -5, navy: 1 };
  if (outcomeId === "forced_combat") payload.wantedDelta = 0;
  if (outcomeId === "flagged_by_navy") payload.wantedDelta = 1;
  if (outcomeId === "hidden_route_unlocked") payload.discoveryId = "hidden_architect_lane";
  if (outcomeId === "architect_secret") payload.discoveryId = "architect_secret_place_name";
  if (outcomeId === "void_revelation") payload.flags.push("void_revelation_seen");

  return payload;
}
