export const FIRST_ARTIFACT_DISCOVERY_EVENT = {
  id: "close_proximity_ping",
  title: "Close Proximity Ping",
  trigger: {
    type: "travel",
    requiresFlagMissing: "artifact_system_unlocked",
    minTravelTick: 1,
    baseChance: 0.18
  },

  proximityAlert: {
    header: "PROXIMITY ALERT",
    text: "Unregistered mass detected. Signal decay suggests long-duration drift. Object is broadcasting a degraded cargo-lock ping.",
    choices: [
      { id: "avoid_object", label: "Avoid Object" },
      { id: "inspect_signal", label: "Inspect Signal" }
    ]
  },

  inspection: {
    header: "SIGNAL INSPECTION",
    text: "The ping leads to scattered cargo ribs, frozen container plates, broken beacon housings, and one intact strongbox still clamped to a shattered freight spine.",
    objectName: "Grav-Lock Coffer",
    choices: [
      { id: "mark_for_later", label: "Mark Coordinates and Leave" },
      { id: "recover_coffer", label: "Recover the Grav-Lock Coffer" }
    ]
  },

  recovery: {
    header: "CARGO BAY RECOVERY",
    text: "The coffer is not large — maybe the size of a shipboard ration crate — but it is heavy enough that the deck magnets complain when it lands. Its ceramic-black alloy shell is pressure scored, unstamped, and deliberately anonymous.",
    choices: [
      { id: "scan_coffer", label: "Scan the Coffer" },
      { id: "crack_grav_lock", label: "Crack the Grav-Lock" }
    ]
  },

  scan: {
    header: "COFFER SCAN",
    text: "The scan returns layered shielding, obsolete smuggler encryption, and a warning that the contents should not be exposed to active navigation systems.",
    choices: [
      { id: "crack_grav_lock", label: "Crack the Grav-Lock" },
      { id: "seal_and_store", label: "Seal and Store It" }
    ]
  },

  lockCrack: {
    header: "GRAV-LOCK BYPASS",
    text: "Most captains would need a bonded locksmith, a Navy warrant, or explosives. You need twenty minutes, three bypass needles, a thermal patience drill, and the kind of education nobody lists on a clean résumé.",
    choices: [
      { id: "open_coffer", label: "Open the Coffer" }
    ]
  },

  contents: {
    header: "COFFER CONTENTS",
    mnemonicWafer: {
      id: "mnemonic_wafer_bleed_acquisition",
      name: "Mnemonic Wafer",
      type: "portable_data_storage",
      description: "A palm-sized translucent crystal data wafer used for encrypted cargo records, identity keys, smuggler manifests, and portable ledger transfers.",
      recoveredText: [
        "ACQUISITION RECORD — PARTIAL RECOVERY",
        "Object Class: Unknown",
        "Origin: Unverified",
        "Acquired From: Independent smuggler cell",
        "Exchange Region: The Bleed",
        "Handling Warning: Do not expose to active navigation systems",
        "Buyer: REDACTED",
        "Secondary Note: “It reacts to routes.”"
      ]
    },
    artifact: {
      id: "ledger_key_shard",
      name: "Ledger Key Shard",
      path: "assets/artifacts/endgame/ledger_key_shard.png",
      rarity: "unknown",
      origin: "unknown",
      initialState: "dormant",
      tags: ["artifact", "ledger", "key_shard", "unknown_origin"],
      description: "A glowing object that looks like a broken piece of a key made by someone who had never seen a lock."
    },
    choices: [
      { id: "return_to_ship", label: "Return to the Ship" }
    ]
  },

  avoided: {
    header: "OBJECT AVOIDED",
    text: "The ship adjusts vector and leaves the signal behind. For a long while, the proximity alert remains cached on the console like an unanswered question.",
    flags: ["first_artifact_ping_avoided"],
    canRecur: true
  },

  marked: {
    header: "COORDINATES MARKED",
    text: "The coordinates are saved for later recovery. The ping fades behind you, still repeating its degraded cargo-lock code.",
    flags: ["first_artifact_site_marked"],
    canRecur: true
  },

  stored: {
    header: "COFFER STORED",
    text: "The coffer is sealed in cargo quarantine. It remains quiet, but the ship routes around it by a fraction of a degree.",
    flags: ["grav_lock_coffer_stored"]
  }
};
