import { clamp } from "./rng.js";

export function applyVoidPressureToCrew(crew = [], voidState = {}, event = null) {
  const tierPressure = derivePressure(voidState);
  const eventSeverity = event?.severity ?? 0;

  return crew.map(member => {
    const sensitive = member.traits?.includes("void_sensitive") ? 1 : 0;
    const hardened = member.traits?.includes("stoic") ? 1 : 0;

    const stressGain = Math.max(0, Math.ceil((tierPressure + eventSeverity) / 4) + sensitive - hardened);
    const paranoiaGain = Math.max(0, Math.ceil((tierPressure + eventSeverity) / 5) + sensitive);

    return {
      ...member,
      stress: clamp((member.stress ?? 0) + stressGain, 0, 10),
      paranoia: clamp((member.paranoia ?? 0) + paranoiaGain, 0, 10)
    };
  });
}

export function generateCrewParanoiaLine(member, event) {
  if (!event) return null;

  if (event.tags.includes("memory")) {
    return `${member.name}: “That is not how I remember boarding this ship.”`;
  }

  if (event.tags.includes("navigation")) {
    return `${member.name}: “The route is lying to us.”`;
  }

  if (event.tags.includes("signal")) {
    return `${member.name}: “Do not answer that.”`;
  }

  return `${member.name}: “Something is wrong.”`;
}

function derivePressure(voidState) {
  return Math.floor(((voidState.exposure ?? 0) + (voidState.realityInstability ?? 0)) / 20);
}
