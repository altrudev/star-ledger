export function buildTravelVisualState({ routeState, tick, tripLength, event = null }) {
  const progress = tick / Math.max(1, tripLength);
  const phase = progress < 0.2 ? "departure" : progress < 0.75 ? "deep_transit" : "approach";

  const layers = [
    "stars_far",
    routeState.biomeLayer ?? "quiet_starfield",
    routeState.factionLayer,
    routeState.voidPressure > 4 ? "void_static_overlay" : null,
    event?.tags?.includes("architect") ? "architect_geometry_flash" : null,
    event?.tags?.includes("war") ? "distant_battle_flash" : null
  ].filter(Boolean);

  return {
    phase,
    progress,
    layers,
    parallaxSpeed: 0.15 + routeState.risk * 0.025,
    distortion: Math.min(1, routeState.voidPressure / 10),
    brightness: routeState.voidPressure > 6 ? 0.72 : 1,
    eventAccent: event?.mood ?? null
  };
}
