import { normalizeCrewRoster } from "./crewState.js";
import { applyTravelTickToCrew } from "./crewEffectsAdapter.js";
import { createCrewConflictDirector } from "./crewConflictDirector.js";
import { evaluateAgendaPressure } from "./crewAgenda.js";

export function runCrewDemo() {
  let crew = normalizeCrewRoster([
    {
      id: "weaver",
      name: "Weaver",
      role: "Hacker / Systems",
      skills: { science: 3, navigation: 2, xenoarchaeology: 2 },
      traits: ["void_sensitive"],
      loyalty: 72,
      stress: 4,
      hiddenAgenda: "architect_obsessed"
    },
    {
      id: "ina",
      name: "Ina",
      role: "Security",
      skills: { protocol: 3, command: 2, weapons: 2 },
      loyalty: 64,
      stress: 2,
      hiddenAgenda: "navy_informant"
    },
    {
      id: "rusk",
      name: "Rusk",
      role: "Smuggler Contact",
      skills: { streetwise: 3, deception: 2 },
      loyalty: 38,
      stress: 6,
      hiddenAgenda: "syndicate_debt"
    }
  ]);

  const tickState = {
    kind: "major_event",
    routeState: { risk: 8 },
    event: { tags: ["void", "psychological"] },
    audio: { intensity: 0.8 }
  };

  crew = applyTravelTickToCrew(crew, tickState);

  const director = createCrewConflictDirector({
    crew,
    playerState: { runSeed: "demo-run" }
  });

  const conflict = director.maybeGenerate({ tags: ["void"] });
  const agendaPressure = crew.map(c => evaluateAgendaPressure(c, { tags: ["void", "psychological"] }, Math.random));

  return { crew, conflict, agendaPressure };
}
