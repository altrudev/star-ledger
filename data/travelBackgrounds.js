export const TRAVEL_BACKGROUNDS = [
  {
    id: "quiet_starfield",
    name: "Quiet Starfield",
    weight: 18,
    layers: ["stars_far", "stars_mid", "dust_faint"],
    dangerMod: -1,
    tags: ["calm", "open_space"]
  },
  {
    id: "blue_nebula_drift",
    name: "Blue Nebula Drift",
    weight: 12,
    layers: ["nebula_blue", "stars_far", "ion_sparks"],
    dangerMod: 1,
    tags: ["nebula", "sensor_noise"]
  },
  {
    id: "rust_debris_lane",
    name: "Rust Debris Lane",
    weight: 10,
    layers: ["debris_field", "stars_far", "warning_beacons"],
    dangerMod: 2,
    tags: ["debris", "pirate_cover"]
  },
  {
    id: "dead_gate_silhouette",
    name: "Dead Gate Silhouette",
    weight: 6,
    layers: ["ancient_gate_shadow", "stars_far", "cold_haze"],
    dangerMod: 3,
    tags: ["architect", "anomaly"]
  },
  {
    id: "void_scar",
    name: "Void Scar",
    weight: 4,
    layers: ["void_fracture", "stars_warped", "purple_static"],
    dangerMod: 5,
    tags: ["void", "corruption", "high_risk"]
  },
  {
    id: "distant_fleet_battle",
    name: "Distant Fleet Battle",
    weight: 5,
    layers: ["battle_flashes", "debris_field", "stars_far"],
    dangerMod: 4,
    tags: ["war", "faction_heat"]
  },
  {
    id: "mining_lanterns",
    name: "Mining Lanterns",
    weight: 8,
    layers: ["asteroid_silhouettes", "industrial_lights", "dust_faint"],
    dangerMod: 1,
    tags: ["miners", "industrial"]
  },
  {
    id: "aurora_lane",
    name: "Aurora Lane",
    weight: 7,
    layers: ["green_aurora", "stars_far", "soft_particles"],
    dangerMod: 0,
    tags: ["rare", "beautiful", "navigation_bonus"]
  }
];

export function pickWeighted(items, rng = Math.random) {
  const total = items.reduce((sum, item) => sum + Math.max(0, item.weight ?? 1), 0);
  let roll = rng() * total;
  for (const item of items) {
    roll -= Math.max(0, item.weight ?? 1);
    if (roll <= 0) return item;
  }
  return items[items.length - 1];
}
