import { createSeededRng } from "./rng.js";
import { VOID_HALLUCINATION_EVENTS, VOID_FALSE_SIGNALS } from "../data/voidEventTables.js";
import { deriveVoidTier, applyVoidExposure, createVoidState } from "./voidExposure.js";

export function createVoidEventDirector({ voidState = {}, playerState = {}, seed = null } = {}) {
  let state = createVoidState(voidState);
  const rng = createSeededRng(seed ?? playerState.runSeed ?? "star-ledger-void");

  function evaluate(context = {}) {
    const tier = deriveVoidTier(state);
    const routePressure = context.routeState?.voidPressure ?? context.voidPressure ?? 0;
    const artifactPressure = (context.artifacts ?? []).filter(a => a.tags?.includes("void")).length * 4;
    const chance = Math.min(0.42, 0.03 + routePressure * 0.004 + artifactPressure * 0.02 + tierChance(tier));

    if (rng() > chance) {
      return {
        triggered: false,
        voidState: state,
        tier
      };
    }

    const event = rng() < 0.75
      ? weightedPick(VOID_HALLUCINATION_EVENTS, rng)
      : weightedPick(VOID_FALSE_SIGNALS, rng);

    state = applyVoidExposure(state, event.severity, event.id);
    state.lastEventIds = [event.id, ...(state.lastEventIds ?? [])].slice(0, 8);

    if (event.tags.includes("memory")) {
      state.memoryContradictions.unshift({
        id: `memory_${event.id}_${Math.floor(rng() * 99999)}`,
        text: event.text,
        sourceEvent: event.id,
        turn: context.turn ?? null
      });
      state.memoryContradictions = state.memoryContradictions.slice(0, 12);
    }

    if (event.tags.includes("signal") || event.tags.includes("navigation")) {
      state.falseSignals.unshift({
        id: `signal_${event.id}_${Math.floor(rng() * 99999)}`,
        title: event.title,
        text: event.text,
        severity: event.severity
      });
      state.falseSignals = state.falseSignals.slice(0, 12);
    }

    return {
      triggered: true,
      event,
      voidState: state,
      tier: deriveVoidTier(state)
    };
  }

  function getState() {
    return JSON.parse(JSON.stringify(state));
  }

  return { evaluate, getState };
}

function tierChance(tier) {
  if (tier === "rupture") return 0.18;
  if (tier === "fracture") return 0.12;
  if (tier === "drift") return 0.07;
  if (tier === "whisper") return 0.03;
  return 0;
}

function weightedPick(items, rng) {
  const total = items.reduce((s, i) => s + (i.weight ?? 1), 0);
  let roll = rng() * total;
  for (const item of items) {
    roll -= item.weight ?? 1;
    if (roll <= 0) return item;
  }
  return items[items.length - 1];
}
