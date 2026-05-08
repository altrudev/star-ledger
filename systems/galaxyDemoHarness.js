import { createGalaxySimulation } from "./galaxySimulation.js";

export function runGalaxyDemo() {
  const sim = createGalaxySimulation({
    playerState: {
      runSeed: "demo-galaxy",
      flags: {
        architect_signal_seen: true,
        void_revelation_seen: true
      }
    }
  });

  const turns = [];
  turns.push(sim.getState());
  turns.push(sim.advanceGalaxyTurn({
    playerActions: [
      { type: "saved_convoy", sectorId: "solace_drift" },
      { type: "destroyed_pirates", routeId: "solace_to_karth" }
    ]
  }));
  turns.push(sim.advanceGalaxyTurn({
    playerActions: [
      { type: "smuggled_artifact", sectorId: "karth_veil" }
    ]
  }));

  return turns;
}
