import { clamp } from "./rng.js";

export function calculateRouteRisk({
  origin,
  destination,
  ship = {},
  crew = [],
  playerState = {},
  galaxyState = {},
  background = null
}) {
  const baseDanger = destination?.danger ?? 1;
  const factionHeat = galaxyState?.factionHeat?.[destination?.controllingFaction] ?? 0;
  const wantedLevel = playerState?.wantedLevel ?? 0;
  const cargoHeat = playerState?.cargoHeat ?? 0;
  const artifactInstability = (playerState?.artifacts ?? []).reduce((sum, a) => sum + (a.instability ?? 0), 0);
  const crewNavigation = crew.reduce((sum, c) => sum + (c.skills?.navigation ?? 0), 0);
  const stealth = ship?.stats?.stealth ?? 0;
  const backgroundDanger = background?.dangerMod ?? 0;

  const raw =
    baseDanger +
    factionHeat * 0.35 +
    wantedLevel * 0.65 +
    cargoHeat * 0.4 +
    artifactInstability * 0.5 +
    backgroundDanger -
    crewNavigation * 0.25 -
    stealth * 0.2;

  return {
    score: clamp(Math.round(raw), 0, 10),
    components: {
      baseDanger,
      factionHeat,
      wantedLevel,
      cargoHeat,
      artifactInstability,
      crewNavigation,
      stealth,
      backgroundDanger
    }
  };
}
