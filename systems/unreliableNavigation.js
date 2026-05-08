export function corruptNavigationPayload(routePayload, voidState = {}) {
  const tier = deriveTierScore(voidState);
  if (tier <= 0) return routePayload;

  const next = JSON.parse(JSON.stringify(routePayload));

  if (tier >= 1) {
    next.displayRisk = Math.max(0, (next.displayRisk ?? next.risk ?? 0) + randomOffset(tier));
  }

  if (tier >= 2) {
    next.ghostDestination = buildGhostDestination(next);
  }

  if (tier >= 3) {
    next.markers = [
      ...(next.markers ?? []),
      { id: "false_marker", label: "RETURN VECTOR", false: true }
    ];
  }

  if (tier >= 4) {
    next.destinationName = next.destinationName
      ? `${next.destinationName} / ${next.originName ?? "ORIGIN"}`
      : "UNRESOLVED DESTINATION";
  }

  return next;
}

function deriveTierScore(voidState) {
  const exposure = voidState.exposure ?? 0;
  const instability = voidState.realityInstability ?? 0;
  const score = exposure + instability;
  if (score >= 120) return 4;
  if (score >= 80) return 3;
  if (score >= 45) return 2;
  if (score >= 20) return 1;
  return 0;
}

function randomOffset(tier) {
  return tier % 2 === 0 ? tier : -tier;
}

function buildGhostDestination(payload) {
  return {
    id: `ghost_${payload.destinationId ?? "unknown"}`,
    name: payload.originName ? `Not ${payload.originName}` : "Previously Arrived",
    confidence: 0.12
  };
}
