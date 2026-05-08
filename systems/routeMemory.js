export function createRouteMemory(existing = {}) {
  const memory = JSON.parse(JSON.stringify(existing ?? {}));

  function record(routeId, event) {
    if (!memory[routeId]) {
      memory[routeId] = { visits: 0, discoveries: [], scars: [], factionNotes: {}, lastEvents: [] };
    }
    const r = memory[routeId];
    if (event.type === "arrival") r.visits += 1;
    r.lastEvents.unshift({ id: event.id, type: event.type, tick: event.tick, outcome: event.outcome ?? null });
    r.lastEvents = r.lastEvents.slice(0, 8);

    if (event.discoveryId && !r.discoveries.includes(event.discoveryId)) r.discoveries.push(event.discoveryId);
    if (event.scarId && !r.scars.includes(event.scarId)) r.scars.push(event.scarId);
    if (event.faction) r.factionNotes[event.faction] = (r.factionNotes[event.faction] ?? 0) + (event.factionDelta ?? 0);
  }

  return { record, get: routeId => memory[routeId] ?? null, dump: () => JSON.parse(JSON.stringify(memory)) };
}
