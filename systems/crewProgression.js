import { updateCrewMember } from "./crewState.js";

export function awardCrewXp(crew, crewId, skill, amount = 1) {
  return updateCrewMember(crew, crewId, member => {
    const xp = { ...(member.xp ?? {}) };
    xp[skill] = (xp[skill] ?? 0) + amount;

    const skills = { ...(member.skills ?? {}) };
    const threshold = skillThreshold(skills[skill] ?? 0);

    if (xp[skill] >= threshold) {
      xp[skill] -= threshold;
      skills[skill] = (skills[skill] ?? 0) + 1;
    }

    return { ...member, xp, skills };
  });
}

export function awardCrewXpByTag(crew, tag, amount = 1) {
  const skill = tagToSkill(tag);
  if (!skill) return crew;

  return crew.map(member => {
    const relevant =
      member.role?.toLowerCase().includes(skill) ||
      (member.skills?.[skill] ?? 0) > 0 ||
      member.traits?.includes("fast_learner");

    if (!relevant) return member;
    return awardSingle(member, skill, amount);
  });
}

function awardSingle(member, skill, amount) {
  const xp = { ...(member.xp ?? {}) };
  const skills = { ...(member.skills ?? {}) };
  xp[skill] = (xp[skill] ?? 0) + amount;

  const threshold = skillThreshold(skills[skill] ?? 0);
  if (xp[skill] >= threshold) {
    xp[skill] -= threshold;
    skills[skill] = (skills[skill] ?? 0) + 1;
  }

  return { ...member, xp, skills };
}

function skillThreshold(level) {
  return 3 + level * 2;
}

function tagToSkill(tag) {
  const map = {
    architect: "xenoarchaeology",
    void: "science",
    pirate: "streetwise",
    navy: "protocol",
    combat: "weapons",
    negotiation: "command",
    navigation: "navigation",
    repair: "engineering",
    deception: "deception"
  };
  return map[tag] ?? null;
}
