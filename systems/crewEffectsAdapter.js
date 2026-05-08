import { applyCrewWideEffect, applyCrewMoraleEffect } from "./crewMorale.js";
import { awardCrewXpByTag, awardCrewXp } from "./crewProgression.js";

export function applyTravelTickToCrew(crew, tickState) {
  let next = crew;

  if (tickState.routeState?.risk >= 7) next = applyCrewWideEffect(next, { stress: 1 });
  if (tickState.event?.tags?.includes("void")) next = applyCrewWideEffect(next, { stress: 1 });
  if (tickState.kind === "ambient" && tickState.audio?.intensity <= 0.3) next = applyCrewWideEffect(next, { stress: -1 });

  for (const tag of tickState.event?.tags ?? []) {
    next = awardCrewXpByTag(next, tag, tickState.kind === "major_event" ? 2 : 1);
  }

  return next;
}

export function applyEncounterStateToCrew(crew, encounterState) {
  let next = crew;

  if (encounterState.tension >= 8) next = applyCrewWideEffect(next, { stress: 1 });
  if (encounterState.resolved && encounterState.outcome) {
    if (encounterState.outcome.corruption) next = applyCrewWideEffect(next, { stress: 1 });
    for (const tag of encounterState.tags ?? []) {
      next = awardCrewXpByTag(next, tag, 2);
    }
  }

  return next;
}

export function applyCrewInterventionResult(crew, result) {
  let next = crew;
  if (result.effects?.stress || result.effects?.loyalty || result.effects?.injury || result.effects?.trauma) {
    next = applyCrewMoraleEffect(next, result.crewId, result.effects);
  }
  if (result.effects?.xpSkill) {
    next = awardCrewXp(next, result.crewId, result.effects.xpSkill, 1);
  }
  return next;
}
