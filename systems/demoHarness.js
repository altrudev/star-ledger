import { createTravelSession } from "./travelSystem.js";
import { createEncounterDirector } from "./encounterDirector.js";

export function runMechanicsSmokeTest() {
  const playerState = {
    runSeed: "demo-run-001",
    wantedLevel: 2,
    cargoHeat: 1,
    reputation: { navy: 20 },
    artifacts: [{ id: "architect_beacon_prism", active: true, instability: 0 }]
  };

  const ship = { stats: { stealth: 2 } };
  const crew = [
    { id: "weaver", name: "Weaver", loyalty: 70, skills: { science: 3, navigation: 2 }, traits: ["void_sensitive"] },
    { id: "ina", name: "Ina", loyalty: 55, skills: { protocol: 2, deception: 1 }, factionTies: { navy: true } }
  ];

  const galaxyState = { factionHeat: { navy: 1, pirates: 3 } };
  const destination = { id: "karth_veil", name: "Karth Veil", distance: 5, danger: 4, controllingFaction: "pirates" };

  const travel = createTravelSession({
    originId: "solace_drift",
    destinationId: destination.id,
    destination,
    ship,
    crew,
    playerState,
    galaxyState
  });

  const director = createEncounterDirector({ playerState, galaxyState, crew, ship });
  const tick = travel.advance();
  const encounter = tick.encounterSeed ? director.generateTravelEncounter(tick) : null;

  return { tick, encounter };
}
