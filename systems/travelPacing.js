export function createTravelPacing({ tripLength = 6, risk = 3, rng = Math.random } = {}) {
  let tick = 0;
  let lastInteractiveTick = -99;
  let majorEventsUsed = 0;
  let lightEventsUsed = 0;
  const maxMajor = risk >= 7 ? 2 : 1;
  const maxLight = Math.max(1, Math.ceil(tripLength / 3));

  function nextKind() {
    tick += 1;
    const progress = tick / tripLength;
    const cooldown = tick - lastInteractiveTick;
    const majorChance = Math.min(0.14, 0.015 + risk * 0.008 + progress * 0.025);
    const lightChance = Math.min(0.32, 0.07 + risk * 0.015);

    if (majorEventsUsed < maxMajor && cooldown >= 3 && rng() < majorChance) {
      majorEventsUsed += 1;
      lastInteractiveTick = tick;
      return "major_event";
    }

    if (lightEventsUsed < maxLight && cooldown >= 2 && rng() < lightChance) {
      lightEventsUsed += 1;
      lastInteractiveTick = tick;
      return "light_decision";
    }

    return "ambient";
  }

  return {
    nextKind,
    getBudget: () => ({ tick, tripLength, majorEventsUsed, lightEventsUsed, maxMajor, maxLight })
  };
}
