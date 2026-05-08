export function findCrewInterventions({ phase, template, state, crew = [] }) {
  const interventions = [];

  for (const member of crew) {
    if (template.tags.includes("pirate") && (member.skills?.streetwise ?? 0) >= 2) {
      interventions.push({
        id: `crew_${member.id}_pirate_read`,
        crewId: member.id,
        label: `${member.name}: Read Pirate Formation`,
        phase,
        effect: { flag: "pirate_formation_read", tension: -1 },
        line: `${member.name}: “Their weak point is not weapons. It is discipline.”`
      });
    }

    if (template.tags.includes("navy") && (member.skills?.protocol ?? 0) >= 2) {
      interventions.push({
        id: `crew_${member.id}_protocol`,
        crewId: member.id,
        label: `${member.name}: Handle Protocol`,
        phase,
        effect: { flag: "protocol_cover", tension: -1 },
        line: `${member.name}: “Let me answer. They are fishing for panic.”`
      });
    }

    if (template.tags.includes("void") && member.traits?.includes("void_sensitive")) {
      interventions.push({
        id: `crew_${member.id}_void_warning`,
        crewId: member.id,
        label: `${member.name}: Listen to the Wrongness`,
        phase,
        effect: { flag: "void_pattern_heard", tension: -1, crewStress: 1 },
        line: `${member.name}: “Do not follow the first memory. It is bait.”`
      });
    }

    if (template.tags.includes("architect") && (member.skills?.xenoarchaeology ?? 0) >= 2) {
      interventions.push({
        id: `crew_${member.id}_architect_translation`,
        crewId: member.id,
        label: `${member.name}: Translate Pattern`,
        phase,
        effect: { flag: "architect_translation", tension: -1 },
        line: `${member.name}: “It is not a warning. It is a permission structure.”`
      });
    }
  }

  return interventions.slice(0, 2);
}
