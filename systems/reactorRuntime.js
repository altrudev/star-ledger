import { clamp } from "./rng.js";

export function evaluateReactorState(ship) {
  const stress = ship.reactorStress ?? 0;

  return {
    warning: stress >= 40,
    critical: stress >= 70,
    meltdownRisk: stress >= 90
  };
}

export function applyReactorTick(ship) {
  const reactor = evaluateReactorState(ship);

  if (!reactor.warning) return ship;

  let next = { ...ship };

  if (reactor.warning) {
    next.heat = clamp((next.heat ?? 0) + 2, 0, 100);
  }

  if (reactor.critical) {
    next.hull = clamp((next.hull ?? 100) - 3, 0, 100);
  }

  return next;
}
