export function deriveTravelMood({ risk = 0, tags = [], phase = "mid_route", lastEventMood = null }) {
  if (lastEventMood) return lastEventMood;
  if (tags.includes("void") || risk >= 8) return "dread";
  if (tags.includes("war") || risk >= 6) return "tension";
  if (tags.includes("architect")) return "awe";
  if (phase === "approach") return "arrival";
  return "calm";
}

export const TRAVEL_MOOD_HINTS = {
  calm: { musicLayer: "low_engine_hum", intensity: 0.2 },
  wonder: { musicLayer: "wide_synths", intensity: 0.35 },
  awe: { musicLayer: "architect_chorale", intensity: 0.45 },
  tension: { musicLayer: "sub_bass_pulse", intensity: 0.65 },
  dread: { musicLayer: "void_discord", intensity: 0.8 },
  arrival: { musicLayer: "destination_rise", intensity: 0.55 },
  mystery: { musicLayer: "signal_motes", intensity: 0.4 },
  lived_in: { musicLayer: "radio_traffic", intensity: 0.3 }
};
