import { FIRST_ARTIFACT_DISCOVERY_EVENT } from "../data/firstArtifactDiscoveryEvent.js";
import { FIRST_ARTIFACT_CREW_DIALOGUE } from "../data/firstArtifactCrewDialogue.js";

export function applyFirstArtifactRewards(playerState = {}) {
  const event = FIRST_ARTIFACT_DISCOVERY_EVENT;
  const artifact = event.contents.artifact;
  const wafer = event.contents.mnemonicWafer;

  const next = {
    ...playerState,
    flags: {
      ...(playerState.flags ?? {}),
      artifact_system_unlocked: true,
      ledger_key_shard_acquired: true,
      first_artifact_discovered: true,
      mnemonic_wafer_bleed_acquisition_recovered: true
    },
    artifacts: [...(playerState.artifacts ?? [])],
    inventory: [...(playerState.inventory ?? [])],
    codex: { ...(playerState.codex ?? {}) }
  };

  if (!next.artifacts.some(a => a.id === artifact.id)) {
    next.artifacts.push({
      id: artifact.id,
      name: artifact.name,
      path: artifact.path,
      rarity: artifact.rarity,
      origin: artifact.origin,
      state: artifact.initialState,
      tags: artifact.tags,
      description: artifact.description,
      discoveredFrom: event.id
    });
  }

  if (!next.inventory.some(i => i.id === wafer.id)) {
    next.inventory.push({
      id: wafer.id,
      name: wafer.name,
      type: wafer.type,
      description: wafer.description,
      recoveredText: wafer.recoveredText
    });
  }

  next.codex[FIRST_ARTIFACT_CREW_DIALOGUE.codexUnlock.id] = FIRST_ARTIFACT_CREW_DIALOGUE.codexUnlock;

  return next;
}
