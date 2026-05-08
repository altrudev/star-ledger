export function resolveDiscoveryInvestigation(discovery, approach = "scan", context = {}) {
  const skill = context.skill ?? 0;
  const risk = discovery.risk ?? 3;
  const successScore = skill + approachBonus(approach);

  const success = successScore >= risk;
  const rewards = success ? buildRewards(discovery) : buildPartialRewards(discovery);

  return {
    discoveryId: discovery.id,
    success,
    approach,
    text: success
      ? `Investigation of ${discovery.name} succeeds.`
      : `Investigation of ${discovery.name} yields partial results.`,
    rewards,
    consequences: buildConsequences(discovery, success)
  };
}

function approachBonus(approach) {
  if (approach === "scan") return 2;
  if (approach === "board") return 4;
  if (approach === "artifact_probe") return 5;
  if (approach === "ignore") return -99;
  return 0;
}

function buildRewards(discovery) {
  return discovery.rewards.map(r => ({ type: r, value: 1 }));
}

function buildPartialRewards(discovery) {
  return discovery.rewards.slice(0, 1).map(r => ({ type: r, value: 0.5 }));
}

function buildConsequences(discovery, success) {
  const c = [];
  if (!success && discovery.tags.includes("void")) c.push({ type: "corruption", amount: 1 });
  if (!success && discovery.tags.includes("salvage")) c.push({ type: "crewStress", amount: 1 });
  if (success && discovery.hiddenRoute) c.push({ type: "unlock_route", route: discovery.hiddenRoute });
  return c;
}
