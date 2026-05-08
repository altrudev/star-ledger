export function calculateEndingPressure({ sectors, factions, routes, playerState = {} }) {
  const sectorList = Object.values(sectors);
  const routeList = Object.values(routes);

  const avgVoid = average(sectorList.map(s => s.voidPressure ?? 0));
  const avgStability = average(sectorList.map(s => s.stability ?? 50));
  const avgLaw = average(sectorList.map(s => s.law ?? 50));
  const avgConflict = average(sectorList.map(s => s.conflict ?? 0));
  const routeCollapse = average(routeList.map(r => 100 - (r.stability ?? 50)));

  const navyPower = factions.navy?.power ?? 0;
  const piratePower = factions.pirates?.power ?? 0;
  const architectFlags = Object.keys(playerState.flags ?? {}).filter(k => k.includes("architect")).length;
  const voidFlags = Object.keys(playerState.flags ?? {}).filter(k => k.includes("void")).length;

  return {
    voidConsumption: Math.round(avgVoid + voidFlags * 4),
    authoritarianOrder: Math.round(navyPower * 0.4 + avgLaw * 0.4 - avgStability * 0.1),
    pirateFragmentation: Math.round(piratePower * 0.5 + avgConflict * 0.4),
    civilCollapse: Math.round((100 - avgStability) * 0.5 + routeCollapse * 0.3 + avgConflict * 0.2),
    architectReturn: Math.round(architectFlags * 12 + avgVoid * 0.08),
    fragileSurvival: Math.round(avgStability * 0.55 + (100 - avgConflict) * 0.25 + (100 - avgVoid) * 0.2)
  };
}

function average(values) {
  if (!values.length) return 0;
  return values.reduce((s, v) => s + v, 0) / values.length;
}
