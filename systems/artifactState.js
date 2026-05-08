import { ARTIFACT_DEFINITIONS } from "../data/artifactDefinitions.js";

export function instantiateArtifact(id) {
  const def = ARTIFACT_DEFINITIONS[id];
  if (!def) throw new Error(`Unknown artifact: ${id}`);

  return {
    ...structuredClone(def),
    containment: 100,
    corruptionLoad: 0,
    cooldowns: {},
    awakened: false,
    bondedCrewId: null,
    exposure: 0,
    resonanceHistory: [],
    flags: {}
  };
}

export function instantiateArtifactCollection(ids = []) {
  return ids.map(instantiateArtifact);
}

function structuredClone(value) {
  return JSON.parse(JSON.stringify(value));
}
