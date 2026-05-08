import { createFirstArtifactDiscoveryRuntime } from "./firstArtifactDiscoveryRuntime.js";

export function runFirstArtifactDiscoveryDemo() {
  const runtime = createFirstArtifactDiscoveryRuntime({
    playerState: {
      runSeed: "demo-first-artifact",
      flags: {},
      artifacts: [],
      inventory: []
    },
    crew: [
      { id: "weaver", name: "Weaver", role: "Hacker / Scientist", traits: ["hacker"] },
      { id: "ina", name: "Ina", role: "Security", traits: ["security"] },
      { id: "rusk", name: "Rusk", role: "Smuggler Contact", traits: ["smuggler", "old_spacer"] }
    ],
    ship: {
      id: "player_ship",
      name: "ISS Revenant"
    }
  });

  const states = [];
  states.push(runtime.start());
  states.push(runtime.choose("inspect_signal"));
  states.push(runtime.choose("recover_coffer"));
  states.push(runtime.choose("crack_grav_lock"));
  states.push(runtime.choose("open_coffer"));
  states.push(runtime.choose("return_to_ship"));

  return states;
}
