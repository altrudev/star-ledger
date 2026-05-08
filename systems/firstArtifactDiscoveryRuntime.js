import { FIRST_ARTIFACT_DISCOVERY_EVENT } from "../data/firstArtifactDiscoveryEvent.js";
import { applyFirstArtifactRewards } from "./firstArtifactRewards.js";
import { buildFirstArtifactCrewConversation } from "./firstArtifactCrewResolver.js";

export function createFirstArtifactDiscoveryRuntime({
  playerState = {},
  crew = [],
  ship = {}
} = {}) {
  const event = FIRST_ARTIFACT_DISCOVERY_EVENT;

  let phase = "idle";
  let log = [];
  let currentPlayerState = playerState;
  let completed = false;
  let rewardsApplied = false;
  let crewConversation = null;

  function start() {
    phase = "proximity_alert";
    log = [{
      type: "system",
      header: event.proximityAlert.header,
      text: event.proximityAlert.text
    }];
    return getState();
  }

  function choose(choiceId) {
    if (completed) return getState();

    if (phase === "proximity_alert") {
      if (choiceId === "avoid_object") {
        phase = "avoided";
        completed = true;
        currentPlayerState = addFlags(currentPlayerState, event.avoided.flags);
        log.push({ type: "choice", text: "You avoid the object." });
        log.push({ type: "result", header: event.avoided.header, text: event.avoided.text });
        return getState();
      }

      if (choiceId === "inspect_signal") {
        phase = "inspection";
        log.push({ type: "choice", text: "You inspect the signal." });
        log.push({ type: "scene", header: event.inspection.header, text: event.inspection.text });
        return getState();
      }
    }

    if (phase === "inspection") {
      if (choiceId === "mark_for_later") {
        phase = "marked";
        completed = true;
        currentPlayerState = addFlags(currentPlayerState, event.marked.flags);
        log.push({ type: "choice", text: "You mark the coordinates and leave." });
        log.push({ type: "result", header: event.marked.header, text: event.marked.text });
        return getState();
      }

      if (choiceId === "recover_coffer") {
        phase = "recovery";
        log.push({ type: "choice", text: "You recover the Grav-Lock Coffer." });
        log.push({ type: "scene", header: event.recovery.header, text: event.recovery.text });
        return getState();
      }
    }

    if (phase === "recovery") {
      if (choiceId === "scan_coffer") {
        phase = "scan";
        log.push({ type: "choice", text: "You scan the coffer." });
        log.push({ type: "scene", header: event.scan.header, text: event.scan.text });
        return getState();
      }

      if (choiceId === "crack_grav_lock") {
        phase = "lock_crack";
        log.push({ type: "choice", text: "You begin cracking the Grav-Lock." });
        log.push({ type: "scene", header: event.lockCrack.header, text: event.lockCrack.text });
        return getState();
      }
    }

    if (phase === "scan") {
      if (choiceId === "seal_and_store") {
        phase = "stored";
        completed = true;
        currentPlayerState = addFlags(currentPlayerState, event.stored.flags);
        log.push({ type: "choice", text: "You seal and store the coffer." });
        log.push({ type: "result", header: event.stored.header, text: event.stored.text });
        return getState();
      }

      if (choiceId === "crack_grav_lock") {
        phase = "lock_crack";
        log.push({ type: "choice", text: "You begin cracking the Grav-Lock." });
        log.push({ type: "scene", header: event.lockCrack.header, text: event.lockCrack.text });
        return getState();
      }
    }

    if (phase === "lock_crack" && choiceId === "open_coffer") {
      phase = "opened";
      log.push({ type: "choice", text: "You open the coffer." });
      log.push({
        type: "discovery",
        header: event.contents.header,
        text: `Inside: a ${event.contents.mnemonicWafer.name} and ${event.contents.artifact.name}.`
      });
      return getState();
    }

    if (phase === "opened" && choiceId === "return_to_ship") {
      phase = "crew_aftermath";
      if (!rewardsApplied) {
        currentPlayerState = applyFirstArtifactRewards(currentPlayerState);
        rewardsApplied = true;
      }
      crewConversation = buildFirstArtifactCrewConversation(crew);
      log.push({ type: "choice", text: "You return to the ship." });
      log.push({ type: "crew", header: crewConversation.title, text: crewConversation.opening });
      completed = true;
      return getState();
    }

    return getState();
  }

  function getOptions() {
    if (phase === "proximity_alert") return event.proximityAlert.choices;
    if (phase === "inspection") return event.inspection.choices;
    if (phase === "recovery") return event.recovery.choices;
    if (phase === "scan") return event.scan.choices;
    if (phase === "lock_crack") return event.lockCrack.choices;
    if (phase === "opened") return event.contents.choices;
    return [];
  }

  function getState() {
    return {
      id: event.id,
      title: event.title,
      phase,
      log,
      options: getOptions(),
      completed,
      rewardsApplied,
      playerState: currentPlayerState,
      cofferName: event.inspection.objectName,
      mnemonicWafer: event.contents.mnemonicWafer,
      artifact: event.contents.artifact,
      crewConversation
    };
  }

  return { start, choose, getState };
}

function addFlags(playerState, flags = []) {
  const next = { ...playerState, flags: { ...(playerState.flags ?? {}) } };
  for (const flag of flags) next.flags[flag] = true;
  return next;
}
