export function normalizeCrewMember(member) {
  return {
    id: member.id,
    name: member.name ?? "Unknown Crew",
    role: member.role ?? "Crew",
    species: member.species ?? "Human",
    factionTies: member.factionTies ?? {},
    skills: {
      command: 0,
      science: 0,
      navigation: 0,
      engineering: 0,
      weapons: 0,
      protocol: 0,
      deception: 0,
      streetwise: 0,
      xenoarchaeology: 0,
      ...(member.skills ?? {})
    },
    xp: member.xp ?? {},
    loyalty: member.loyalty ?? 50,
    stress: member.stress ?? 0,
    trauma: member.trauma ?? [],
    injuries: member.injuries ?? [],
    traits: member.traits ?? [],
    hiddenAgenda: member.hiddenAgenda ?? null,
    agendaRevealed: member.agendaRevealed ?? false,
    status: member.status ?? "active",
    relationship: member.relationship ?? {},
    flags: member.flags ?? {}
  };
}

export function normalizeCrewRoster(crew = []) {
  return crew.map(normalizeCrewMember);
}

export function updateCrewMember(crew, crewId, updater) {
  return crew.map(member => {
    if (member.id !== crewId) return member;
    return normalizeCrewMember(updater({ ...member }));
  });
}

export function getActiveCrew(crew) {
  return crew.filter(c => c.status === "active" && !c.injuries?.some(i => i.severity === "critical"));
}
