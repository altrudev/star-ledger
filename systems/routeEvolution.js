import { clamp } from "./rng.js";

export function normalizeRoute(route) {
  return {
    ...route,
    stability: clamp(route.stability ?? 50, 0, 100),
    traffic: clamp(route.traffic ?? 30, 0, 100),
    piracy: clamp(route.piracy ?? 10, 0, 100),
    blockade: clamp(route.blockade ?? 0, 0, 100),
    voidPressure: clamp(route.voidPressure ?? 0, 0, 100),
    hidden: !!route.hidden,
    tags: route.tags ?? []
  };
}

export function evolveRoute(route, sectors = {}) {
  const r = normalizeRoute(route);
  const a = sectors[r.from];
  const b = sectors[r.to];

  const avgStability = ((a?.stability ?? 50) + (b?.stability ?? 50)) / 2;
  const avgLaw = ((a?.law ?? 50) + (b?.law ?? 50)) / 2;
  const avgConflict = ((a?.conflict ?? 0) + (b?.conflict ?? 0)) / 2;
  const avgVoid = ((a?.voidPressure ?? 0) + (b?.voidPressure ?? 0)) / 2;

  return normalizeRoute({
    ...r,
    stability: r.stability + Math.round((avgStability - 50) * 0.03) - Math.round(avgVoid * 0.02),
    traffic: r.traffic + Math.round(avgStability * 0.02) - Math.round(r.piracy * 0.03) - Math.round(r.blockade * 0.04),
    piracy: r.piracy + (avgLaw < 35 ? 2 : -1) + Math.round(avgConflict * 0.02),
    blockade: r.blockade + (avgConflict > 55 && avgLaw > 50 ? 2 : -1),
    voidPressure: r.voidPressure + Math.round(avgVoid * 0.025)
  });
}

export function applyRouteDelta(route, delta = {}) {
  return normalizeRoute({
    ...route,
    stability: (route.stability ?? 50) + (delta.stability ?? 0),
    traffic: (route.traffic ?? 30) + (delta.traffic ?? 0),
    piracy: (route.piracy ?? 0) + (delta.piracy ?? 0),
    blockade: (route.blockade ?? 0) + (delta.blockade ?? 0),
    voidPressure: (route.voidPressure ?? 0) + (delta.voidPressure ?? 0)
  });
}

export function routeToTravelRisk(route) {
  const r = normalizeRoute(route);
  return clamp(
    Math.round(
      (100 - r.stability) * 0.035 +
      r.piracy * 0.04 +
      r.blockade * 0.035 +
      r.voidPressure * 0.045
    ),
    0,
    10
  );
}
