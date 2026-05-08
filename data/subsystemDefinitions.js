export const SHIP_SUBSYSTEMS = {
  reactor: {
    id: "reactor",
    maxIntegrity: 100,
    criticalThreshold: 25,
    effects: {
      lowIntegrity: ["power_fluctuation"],
      critical: ["reactor_instability"]
    }
  },
  engines: {
    id: "engines",
    maxIntegrity: 100,
    criticalThreshold: 20,
    effects: {
      lowIntegrity: ["reduced_evasion"],
      critical: ["mobility_loss"]
    }
  },
  weapons: {
    id: "weapons",
    maxIntegrity: 100,
    criticalThreshold: 20,
    effects: {
      lowIntegrity: ["weapon_inaccuracy"],
      critical: ["weapon_failure"]
    }
  },
  life_support: {
    id: "life_support",
    maxIntegrity: 100,
    criticalThreshold: 30,
    effects: {
      lowIntegrity: ["air_quality_loss"],
      critical: ["decompression_risk"]
    }
  },
  containment: {
    id: "containment",
    maxIntegrity: 100,
    criticalThreshold: 35,
    effects: {
      lowIntegrity: ["artifact_leak"],
      critical: ["artifact_breach"]
    }
  },
  sensors: {
    id: "sensors",
    maxIntegrity: 100,
    criticalThreshold: 15,
    effects: {
      lowIntegrity: ["targeting_loss"],
      critical: ["blind_navigation"]
    }
  }
};
