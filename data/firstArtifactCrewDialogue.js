export const FIRST_ARTIFACT_CREW_DIALOGUE = {
  id: "crew_discusses_first_artifact",
  title: "Cargo Bay Discussion",
  opening: "The crew gathers in the cargo bay without being called. Nobody touches the object. That is the first sign everyone understands what it might be.",
  beats: [
    {
      id: "rumor_intro",
      speakerPreference: ["smuggler", "trader", "old_spacer"],
      fallbackName: "Rusk",
      line: "I heard stories about things like this. Old alien pieces. Some light up. Some open doors. Some make ships disappear from clean routes."
    },
    {
      id: "skeptic_question",
      speakerPreference: ["security", "navy", "engineer"],
      fallbackName: "Ina",
      line: "And some do nothing?"
    },
    {
      id: "rumor_answer",
      speakerPreference: ["smuggler", "trader", "old_spacer"],
      fallbackName: "Rusk",
      line: "Some do nothing until someone finds the rest of them."
    },
    {
      id: "captain_silence",
      speakerPreference: ["hacker", "scientist", "navigator"],
      fallbackName: "Weaver",
      line: "The wafer says it reacts to routes. That is not cargo behavior. That is navigation behavior."
    },
    {
      id: "system_unlock_line",
      speakerPreference: ["security", "engineer"],
      fallbackName: "Ina",
      line: "Then we treat it like a live system, not a souvenir."
    }
  ],
  codexUnlock: {
    id: "codex_artifacts_intro",
    title: "Artifacts",
    text: "Artifacts may be active relics with usable effects, passive relics that alter routes or encounters, dormant relics with no immediate effect, or key fragments connected to larger endgame discoveries."
  }
};
