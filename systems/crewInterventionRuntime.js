export function buildCrewInterventionsForContext({ crew = [], context = {} }) {
  const tags = context.tags ?? [];
  const interventions = [];

  for (const member of crew) {
    if (member.status !== "active") continue;

    if (tags.includes("pirate") && (member.skills?.streetwise ?? 0) >= 2) {
      interventions.push(makeIntervention(member, "streetwise", "Read the raider pattern", -1));
    }

    if (tags.includes("navy") && (member.skills?.protocol ?? 0) >= 2) {
      interventions.push(makeIntervention(member, "protocol", "Handle the inspection protocol", -1));
    }

    if (tags.includes("void") && (member.skills?.science ?? 0) >= 2) {
      interventions.push(makeIntervention(member, "science", "Stabilize the anomaly reading", -1, { stress: 1 }));
    }

    if (tags.includes("architect") && (member.skills?.xenoarchaeology ?? 0) >= 2) {
      interventions.push(makeIntervention(member, "xenoarchaeology", "Translate Architect pattern", -1));
    }

    if ((member.loyalty ?? 50) >= 80 && context.tension >= 7) {
      interventions.push(makeIntervention(member, "loyalty", "Take a personal risk for the ship", -2, { injuryChance: 0.15 }));
    }
  }

  return interventions.slice(0, 3);
}

export function resolveCrewIntervention(intervention, rng = Math.random) {
  const result = {
    crewId: intervention.crewId,
    text: intervention.line,
    effects: { ...(intervention.effects ?? {}) },
    success: true
  };

  if (intervention.effects?.injuryChance && rng() < intervention.effects.injuryChance) {
    result.effects.injury = {
      id: "intervention_wound",
      name: "Intervention Wound",
      severity: "minor"
    };
  }

  return result;
}

function makeIntervention(member, skill, label, tension, extra = {}) {
  return {
    id: `crew_${member.id}_${skill}`,
    crewId: member.id,
    label: `${member.name}: ${label}`,
    skill,
    line: `${member.name} steps in before the situation hardens.`,
    effects: { tension, xpSkill: skill, ...extra }
  };
}
