// Star Ledger Asset Brightness Runtime v2.1.2
// Optional runtime helper for screens that inject images dynamically.

export const STAR_LEDGER_ASSET_BRIGHTNESS_VERSION = "v2.1.2";

export function installAssetBrightnessGuard(root = document) {
  applyAssetBrightness(root);

  const observer = new MutationObserver(() => applyAssetBrightness(root));
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["src", "style", "class"]
  });

  return observer;
}

export function applyAssetBrightness(root = document) {
  const images = Array.from(root.querySelectorAll("img"));

  for (const img of images) {
    if (img.dataset.slBrightnessPatched === "true") continue;

    const src = (img.getAttribute("src") || "").toLowerCase();
    const family = inferAssetFamily(src);
    const filter = filterForFamily(family);

    img.style.filter = mergeFilter(img.style.filter, filter);
    img.dataset.slAsset = family;
    img.dataset.slBrightnessPatched = "true";
  }
}

function inferAssetFamily(src) {
  if (src.includes("artifact") || src.includes("relic")) return "artifact";
  if (src.includes("avatar") || src.includes("portrait") || src.includes("crew") || src.includes("npc")) return "portrait";
  if (src.includes("ship") || src.includes("vessel")) return "ship";
  if (src.includes("background") || src.includes("destination") || src.includes("travel") || src.includes("title")) return "background";
  return "default";
}

function filterForFamily(family) {
  switch (family) {
    case "artifact":
      return "brightness(1.20) contrast(1.12) saturate(1.10)";
    case "portrait":
      return "brightness(1.18) contrast(1.08) saturate(1.06)";
    case "ship":
      return "brightness(1.16) contrast(1.08) saturate(1.05)";
    case "background":
      return "brightness(1.10) contrast(1.06) saturate(1.04)";
    default:
      return "brightness(1.12) contrast(1.06) saturate(1.04)";
  }
}

function mergeFilter(existing, patch) {
  if (!existing || existing === "none") return patch;
  if (existing.includes("brightness(")) return existing;
  return `${existing} ${patch}`;
}
