import { clamp } from "./rng.js";

export function normalizeSector(sector) {
  return {
    ...sector,
    stability: clamp(sector.stability ?? 50, 0, 100),
    wealth: clamp(sector.wealth ?? 50, 0, 100),
    law: clamp(sector.law ?? 50, 0, 100),
    corruption: clamp(sector.corruption ?? 20, 0, 100),
    voidPressure: clamp(sector.voidPressure ?? 0, 0, 100),
    populationPressure: clamp(sector.populationPressure ?? 25, 0, 100),
    conflict: clamp(sector.conflict ?? 0, 0, 100),
    resources: sector.resources ?? [],
    tags: sector.tags ?? []
  };
}

export function evolveSector(sector, galaxyContext = {}) {
  const s = normalizeSector(sector);

  const instabilityDrift =
    Math.round(s.conflict * 0.03) +
    Math.round(s.corruption * 0.02) +
    Math.round(s.voidPressure * 0.025) -
    Math.round(s.law * 0.025);

  return normalizeSector({
    ...s,
    stability: s.stability - instabilityDrift,
    wealth: s.wealth + Math.round(s.stability * 0.015) - Math.round(s.conflict * 0.02),
    law: s.law + (s.controller === "navy" ? 1 : 0) - Math.round(s.corruption * 0.01),
    corruption: s.corruption + (s.law < 30 ? 1 : 0) + (s.controller === "pirates" ? 1 : 0),
    conflict: s.conflict + (s.stability < 30 ? 2 : 0) - (s.law > 70 ? 1 : 0),
    populationPressure: s.populationPressure + (s.stability < 35 ? 2 : -1),
    voidPressure: s.voidPressure + (galaxyContext.voidGlobalPressure ?? 0)
  });
}

export function applySectorDelta(sector, delta = {}) {
  return normalizeSector({
    ...sector,
    stability: (sector.stability ?? 50) + (delta.stability ?? 0),
    wealth: (sector.wealth ?? 50) + (delta.wealth ?? 0),
    law: (sector.law ?? 50) + (delta.law ?? 0),
    corruption: (sector.corruption ?? 0) + (delta.corruption ?? 0),
    voidPressure: (sector.voidPressure ?? 0) + (delta.voidPressure ?? 0),
    populationPressure: (sector.populationPressure ?? 0) + (delta.populationPressure ?? 0),
    conflict: (sector.conflict ?? 0) + (delta.conflict ?? 0)
  });
}
