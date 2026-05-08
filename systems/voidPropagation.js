import { clamp } from "./rng.js";

export function advanceVoidPropagation(sectors, routes, rng = Math.random) {
  const nextSectors = JSON.parse(JSON.stringify(sectors));
  const nextRoutes = JSON.parse(JSON.stringify(routes));
  const voidEvents = [];

  for (const sector of Object.values(nextSectors)) {
    const pressure = sector.voidPressure ?? 0;
    if (pressure <= 0) continue;

    const spreadChance = Math.min(0.35, pressure / 220);
    if (rng() < spreadChance) {
      sector.voidPressure = clamp(pressure + 4, 0, 100);
      sector.stability = clamp((sector.stability ?? 50) - 2, 0, 100);
      sector.populationPressure = clamp((sector.populationPressure ?? 0) + 1, 0, 100);
      voidEvents.push({
        id: `void_growth_${sector.id}`,
        type: "void_growth",
        sectorId: sector.id,
        text: `${sector.name} reports navigation errors and memory discrepancies.`
      });
    }
  }

  for (const route of Object.values(nextRoutes)) {
    const a = nextSectors[route.from];
    const b = nextSectors[route.to];
    const avgVoid = ((a?.voidPressure ?? 0) + (b?.voidPressure ?? 0)) / 2;

    if (avgVoid > 30) {
      route.voidPressure = clamp((route.voidPressure ?? 0) + Math.round(avgVoid * 0.03), 0, 100);
      route.stability = clamp((route.stability ?? 50) - 1, 0, 100);
    }
  }

  return { sectors: nextSectors, routes: nextRoutes, voidEvents };
}
