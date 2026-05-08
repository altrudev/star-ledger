import { createTravelDirector } from "./travelDirector.js";

export function runTravelCoreDemo() {
  const director = createTravelDirector({
    route: {
      id: "solace_to_karth_veil",
      originId: "solace_drift",
      destinationId: "karth_veil",
      distance: 7,
      risk: 4,
      faction: "pirates",
      voidPressure: 3,
      anomalyDensity: 5,
      tags: ["debris"]
    },
    crew: [{ id: "weaver", name: "Weaver" }, { id: "ina", name: "Ina" }],
    playerState: { runSeed: "demo-run", wantedLevel: 1, resources: { fuel: 18, credits: 400 } },
    galaxyState: { factionHeat: { pirates: 4 } }
  });

  const ticks = [];
  for (let i = 0; i < 7; i++) ticks.push(director.advanceTravel());
  return ticks;
}
