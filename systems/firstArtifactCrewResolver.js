import { FIRST_ARTIFACT_CREW_DIALOGUE } from "../data/firstArtifactCrewDialogue.js";

export function buildFirstArtifactCrewConversation(crew = []) {
  const dialogue = FIRST_ARTIFACT_CREW_DIALOGUE;

  return {
    id: dialogue.id,
    title: dialogue.title,
    opening: dialogue.opening,
    lines: dialogue.beats.map(beat => {
      const speaker = pickSpeaker(crew, beat.speakerPreference) ?? { name: beat.fallbackName };
      return {
        id: beat.id,
        speakerId: speaker.id ?? null,
        speakerName: speaker.name,
        text: beat.line.replaceAll(beat.fallbackName, speaker.name)
      };
    }),
    codexUnlock: dialogue.codexUnlock
  };
}

function pickSpeaker(crew, preferences = []) {
  if (!crew?.length) return null;

  for (const pref of preferences) {
    const match = crew.find(c =>
      c.role?.toLowerCase().includes(pref) ||
      c.traits?.includes(pref) ||
      c.factionTies?.[pref]
    );
    if (match) return match;
  }

  return crew[0];
}
