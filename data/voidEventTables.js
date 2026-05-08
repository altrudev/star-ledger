export const VOID_HALLUCINATION_EVENTS = [
  {
    id: "duplicate_crew_voice",
    title: "Duplicate Voice",
    text: "A crew member speaks over comms while standing silently beside you.",
    tags: ["crew", "audio", "memory"],
    weight: 8,
    severity: 2
  },
  {
    id: "wrong_destination_memory",
    title: "Wrong Destination",
    text: "For several seconds, everyone remembers choosing a different destination.",
    tags: ["navigation", "memory"],
    weight: 7,
    severity: 3
  },
  {
    id: "starfield_blinks",
    title: "Starfield Blink",
    text: "The stars blink in sequence, like eyelids closing across the route.",
    tags: ["visual", "void"],
    weight: 5,
    severity: 4
  },
  {
    id: "dead_contact_message",
    title: "Dead Contact Message",
    text: "A message arrives from someone who died before the journey began.",
    tags: ["signal", "memory", "psychological"],
    weight: 4,
    severity: 5
  },
  {
    id: "inventory_mismatch",
    title: "Inventory Mismatch",
    text: "The cargo manifest lists one item you never loaded and one person you never hired.",
    tags: ["manifest", "identity"],
    weight: 5,
    severity: 3
  },
  {
    id: "ship_map_extra_room",
    title: "Extra Room",
    text: "For one scan cycle, the ship map shows an extra room behind the reactor wall.",
    tags: ["ship", "interior", "impossible"],
    weight: 3,
    severity: 6
  }
];

export const VOID_FALSE_SIGNALS = [
  {
    id: "false_distress",
    title: "False Distress",
    text: "A distress beacon repeats your ship ID as the casualty source.",
    tags: ["distress", "trap"],
    severity: 3
  },
  {
    id: "impossible_trade_offer",
    title: "Impossible Trade Offer",
    text: "A market ping offers to buy an artifact you have not discovered yet.",
    tags: ["economy", "artifact"],
    severity: 4
  },
  {
    id: "return_signal",
    title: "Return Signal",
    text: "Navigation receives a clean return vector from your destination before you arrive.",
    tags: ["navigation", "paradox"],
    severity: 5
  }
];

export const UI_CORRUPTION_STATES = {
  clean: {
    id: "clean",
    intensity: 0,
    effects: []
  },
  whisper: {
    id: "whisper",
    intensity: 1,
    effects: ["subtle_static", "text_flicker"]
  },
  drift: {
    id: "drift",
    intensity: 2,
    effects: ["coordinate_jitter", "ghost_labels"]
  },
  fracture: {
    id: "fracture",
    intensity: 3,
    effects: ["false_markers", "delayed_hud", "audio_reversal"]
  },
  rupture: {
    id: "rupture",
    intensity: 4,
    effects: ["unreliable_ui", "memory_overlay", "navigation_contradiction"]
  }
};
