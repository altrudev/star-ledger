import { createSeededRng } from "./rng.js";
import { FIRST_ARTIFACT_DISCOVERY_EVENT } from "../data/firstArtifactDiscoveryEvent.js";

export function shouldTriggerFirstArtifactDiscovery({
  playerState = {},
  travelTick = {},
  force = false,
  seed = null
} = {}) {
  if (playerState.flags?.artifact_system_unlocked) return false;
  if (playerState.flags?.ledger_key_shard_acquired) return false;
  if ((travelTick.tick ?? 0) < FIRST_ARTIFACT_DISCOVERY_EVENT.trigger.minTravelTick) return false;

  if (force) return true;

  const rng = createSeededRng(seed ?? `${playerState.runSeed ?? "run"}:first-artifact:${travelTick.routeId ?? "route"}`);
  return rng() < FIRST_ARTIFACT_DISCOVERY_EVENT.trigger.baseChance;
}
