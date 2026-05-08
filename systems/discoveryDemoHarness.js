import { createDiscoveryDirector } from "./discoveryDirector.js";

export function runDiscoveryDemo() {
  const director = createDiscoveryDirector({
    playerState: { runSeed: "demo-discovery" },
    artifacts: [
      { id: "architect_lens", name: "Architect Lens", tags: ["architect"], awakened: false },
      { id: "void_resonance_cube", name: "Void Resonance Cube", tags: ["void"], awakened: true }
    ]
  });

  const discovery = director.maybeDiscover({
    baseChance: 0.9,
    anomalyDensity: 5,
    source: "travel",
    routeState: {
      id: "hollow_to_eidolon",
      risk: 7,
      voidPressure: 58,
      from: "hollow_reef"
    },
    sector: {
      id: "eidolon_wake",
      tags: ["void", "architect"],
      voidPressure: 66
    }
  });

  const investigation = discovery
    ? director.investigate(discovery.id, "artifact_probe", { skill: 5 })
    : null;

  return {
    discovery,
    investigation,
    state: director.getState()
  };
}
