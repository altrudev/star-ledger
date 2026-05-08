import { createEncounterRuntime } from "./encounterRuntime.js";

export function runEncounterDemo() {
  const runtime = createEncounterRuntime({
    templateId: "pirate_vector_trap",
    seed: "demo-encounter",
    playerState: {
      runSeed: "demo-run",
      resources: { credits: 250, fuel: 12 },
      reputation: { navy: 20, pirates: -5 },
      artifacts: [{ id: "void_resonance_cube", active: true, tags: ["artifact_reaction"] }]
    },
    ship: { stats: { engines: 3, stealth: 2, weapons: 3, systems: 2 } },
    crew: [
      { id: "weaver", name: "Weaver", skills: { science: 3, xenoarchaeology: 2 }, traits: ["void_sensitive"] },
      { id: "ina", name: "Ina", skills: { protocol: 3, command: 2 } },
      { id: "rusk", name: "Rusk", skills: { streetwise: 3, deception: 2 } }
    ],
    galaxyState: {}
  });

  const states = [];
  states.push(runtime.getState());
  states.push(runtime.choose("scan"));
  states.push(runtime.choose("crew_rusk_pirate_read"));
  states.push(runtime.choose("bluff_navy"));
  return states;
}
