import { createVoidState, applyVoidExposure } from "./voidExposure.js";

export function applyVoidConsequences({ playerState = {}, crew = [], voidState = {}, eventResult = null }) {
  let nextPlayer = {
    ...playerState,
    corruption: playerState.corruption ?? 0,
    flags: { ...(playerState.flags ?? {}) }
  };

  let nextVoid = createVoidState(voidState);
  let nextCrew = crew;

  if (!eventResult?.triggered) {
    return { playerState: nextPlayer, crew: nextCrew, voidState: nextVoid };
  }

  const event = eventResult.event;
  nextVoid = eventResult.voidState;

  if (event.severity >= 4) {
    nextPlayer.corruption += 1;
  }

  if (event.tags.includes("identity")) {
    nextPlayer.flags.identity_contradiction_seen = true;
  }

  if (event.tags.includes("impossible")) {
    nextPlayer.flags.impossible_ship_space_seen = true;
  }

  if (event.tags.includes("paradox")) {
    nextPlayer.flags.navigation_paradox_seen = true;
  }

  return {
    playerState: nextPlayer,
    crew: nextCrew,
    voidState: nextVoid
  };
}

export function resolveVoidChoice(choiceId, voidState = {}) {
  let next = createVoidState(voidState);

  if (choiceId === "ignore") {
    next.paranoia += 1;
  }

  if (choiceId === "document") {
    next.exposure += 1;
    next.flags.documented_void_event = true;
  }

  if (choiceId === "suppress") {
    next = applyVoidExposure(next, -1, "suppression");
    next.paranoia += 2;
  }

  if (choiceId === "listen") {
    next.exposure += 3;
    next.flags.listened_to_void = true;
  }

  return next;
}
