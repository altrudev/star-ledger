export function createFactionMemory(existing = {}) {
  const memory = JSON.parse(JSON.stringify(existing ?? {}));

  function recordEncounter({ faction, outcomeId, delta = 0 }) {
    if (!faction) return;
    if (!memory[faction]) memory[faction] = { encounters: 0, score: 0, notes: [] };
    memory[faction].encounters += 1;
    memory[faction].score += delta;
    memory[faction].notes.unshift({ outcomeId, delta, at: Date.now() });
    memory[faction].notes = memory[faction].notes.slice(0, 12);
  }

  function getFaction(faction) {
    return memory[faction] ?? { encounters: 0, score: 0, notes: [] };
  }

  return { recordEncounter, getFaction, dump: () => JSON.parse(JSON.stringify(memory)) };
}
