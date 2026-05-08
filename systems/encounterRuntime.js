import { ENCOUNTER_TEMPLATES_V2 } from "../data/encounterTemplatesV2.js";
import { createSeededRng, clamp } from "./rng.js";
import { resolveCheck, optionIsAvailable, computeTensionDelta } from "./skillChecks.js";
import { buildOutcomePayload, applyEncounterOutcome } from "./encounterConsequences.js";
import { findCrewInterventions } from "./crewInterventions.js";

export function createEncounterRuntime({
  templateId,
  template = null,
  playerState = {},
  ship = {},
  crew = [],
  galaxyState = {},
  seed = null
}) {
  const activeTemplate = template ?? ENCOUNTER_TEMPLATES_V2[templateId];
  if (!activeTemplate) throw new Error(`Unknown encounter template: ${templateId}`);

  const rng = createSeededRng(seed ?? `${playerState.runSeed ?? "run"}:${activeTemplate.id}:${Date.now()}`);
  let phase = "intro";
  let tension = activeTemplate.startingTension ?? 4;
  let flags = {};
  let log = [{ type: "opening", text: activeTemplate.opening }];
  let resolved = false;
  let outcome = null;
  let currentPlayerState = playerState;

  function getOptions() {
    if (resolved) return [];
    const phaseOptions = activeTemplate.options?.[phase] ?? [];
    const context = {
      phase,
      tags: activeTemplate.tags,
      playerState: currentPlayerState,
      ship,
      crew,
      galaxyState,
      flags
    };

    const normalOptions = phaseOptions
      .filter(option => optionIsAvailable(option, context))
      .map(option => ({
        id: option.id,
        label: option.label,
        kind: "normal",
        check: option.check ?? null,
        cost: option.cost ?? null
      }));

    const crewOptions = findCrewInterventions({ phase, template: activeTemplate, state: { phase, tension, flags }, crew })
      .filter(intervention => !flags[intervention.effect.flag])
      .map(intervention => ({
        id: intervention.id,
        label: intervention.label,
        kind: "crew",
        line: intervention.line
      }));

    return [...normalOptions, ...crewOptions];
  }

  function choose(optionId) {
    if (resolved) return getState();

    const crewIntervention = findCrewInterventions({ phase, template: activeTemplate, state: { phase, tension, flags }, crew })
      .find(i => i.id === optionId);

    if (crewIntervention) {
      flags[crewIntervention.effect.flag] = true;
      tension = clamp(tension + (crewIntervention.effect.tension ?? 0), 0, 10);
      if (crewIntervention.effect.crewStress) {
        currentPlayerState = applyEncounterOutcome(currentPlayerState, { crewStress: crewIntervention.effect.crewStress });
      }
      log.push({ type: "crew", text: crewIntervention.line });
      return getState();
    }

    const option = (activeTemplate.options?.[phase] ?? []).find(o => o.id === optionId);
    if (!option) return getState();

    const checkResult = resolveCheck({ check: option.check, playerState: currentPlayerState, ship, crew, rng });
    const success = checkResult.success;

    if (option.flag) flags[option.flag] = true;
    if (success && option.successFlag) flags[option.successFlag] = true;

    tension = clamp(tension + computeTensionDelta(option, checkResult), 0, 10);

    const outcomeId =
      checkResult.attempted
        ? (success ? option.successOutcome : option.failureOutcome)
        : option.outcome;

    log.push({
      type: "choice",
      optionId,
      label: option.label,
      check: checkResult.attempted ? checkResult : null,
      text: buildChoiceText(option, checkResult)
    });

    if (outcomeId || option.nextPhase === "resolution") {
      const finalOutcomeId = outcomeId ?? inferFallbackOutcome(activeTemplate, option, tension);
      outcome = buildOutcomePayload(activeTemplate, finalOutcomeId, option);
      currentPlayerState = applyEncounterOutcome(currentPlayerState, outcome);
      phase = "aftermath";
      resolved = true;
      log.push({ type: "outcome", outcomeId: finalOutcomeId, text: outcome.text });
      return getState();
    }

    if (option.nextPhase) phase = option.nextPhase;
    if (tension >= 9 && phase !== "aftermath") {
      outcome = buildOutcomePayload(activeTemplate, "forced_combat", option);
      currentPlayerState = applyEncounterOutcome(currentPlayerState, outcome);
      phase = "aftermath";
      resolved = true;
      log.push({ type: "outcome", outcomeId: "forced_combat", text: outcome.text });
    }

    return getState();
  }

  function getState() {
    return {
      id: activeTemplate.id,
      title: activeTemplate.title,
      faction: activeTemplate.faction,
      tags: activeTemplate.tags,
      phase,
      tension,
      flags,
      opening: activeTemplate.opening,
      log,
      options: getOptions(),
      resolved,
      outcome,
      playerState: currentPlayerState
    };
  }

  return { choose, getState };
}

function buildChoiceText(option, checkResult) {
  if (!checkResult?.attempted) return `You choose: ${option.label}.`;
  const result = checkResult.success ? "Success" : "Failure";
  return `${option.label}: ${result} (${checkResult.total} vs DC ${checkResult.dc}).`;
}

function inferFallbackOutcome(template, option, tension) {
  if (template.id === "pirate_vector_trap") return tension >= 7 ? "exchange_damage" : "paid_toll";
  if (template.id === "navy_black_inspection") return tension >= 7 ? "inspection_escalates" : "partial_log_review";
  if (template.id === "void_memory_skip") return tension >= 7 ? "route_scarred" : "memory_sealed";
  if (template.id === "architect_lane_unfolding") return "partial_coordinates";
  return "resolved";
}
