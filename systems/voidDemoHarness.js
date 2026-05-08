import { createVoidEventDirector } from "./voidEventDirector.js";
import { corruptNavigationPayload } from "./unreliableNavigation.js";
import { applyVoidPressureToCrew } from "./crewParanoia.js";

export function runVoidDemo() {
  const director = createVoidEventDirector({
    voidState: {
      exposure: 44,
      corruption: 12,
      paranoia: 20,
      realityInstability: 38
    },
    playerState: { runSeed: "demo-void" }
  });

  const result = director.evaluate({
    routeState: { voidPressure: 60 },
    artifacts: [{ id: "void_resonance_cube", tags: ["void"] }],
    turn: 4
  });

  const nav = corruptNavigationPayload({
    originName: "Solace Drift",
    destinationName: "Eidolon Wake",
    destinationId: "eidolon_wake",
    risk: 7
  }, result.voidState);

  const crew = applyVoidPressureToCrew([
    { id: "weaver", name: "Weaver", traits: ["void_sensitive"], stress: 4 },
    { id: "ina", name: "Ina", traits: ["stoic"], stress: 2 }
  ], result.voidState, result.event);

  return { result, nav, crew };
}
