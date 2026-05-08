// Star Ledger Forced Brightness Overwrite v2.1.6
// Self-installing runtime for dynamically injected/canvas/background visuals.

export function installForcedBrightnessOverwrite() {
  document.documentElement.classList.add("sl-brightness-force");
  document.body?.classList.add("sl-brightness-force");

  const apply = () => {
    const selector = [
      "img", "video", "canvas", "picture", "svg image",
      "[style*='background-image']",
      "[class*='background']", "[class*='Background']",
      "[class*='visual']", "[class*='Visual']",
      "[class*='portrait']", "[class*='Portrait']",
      "[class*='asset']", "[class*='Asset']",
      "[class*='ship']", "[class*='Ship']",
      "[class*='destination']", "[class*='Destination']",
      "[class*='travel']", "[class*='Travel']",
      "[class*='encounter']", "[class*='Encounter']",
      ".title-screen", ".main-menu", ".travel-screen", ".destination-screen",
      ".encounter-screen", ".scene-screen", ".comms-screen", ".screen", ".scene"
    ].join(",");

    document.querySelectorAll(selector).forEach((node) => {
      node.style.setProperty(
        "filter",
        "brightness(1.32) contrast(1.10) saturate(1.08)",
        "important"
      );
    });

    document.querySelectorAll(".overlay,.vignette,.dark-overlay,.scanlines,.crt-overlay,.noise-overlay,[class*='vignette'],[class*='darken']").forEach((node) => {
      node.style.setProperty("opacity", "0.42", "important");
    });
  };

  apply();

  const observer = new MutationObserver(apply);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["src", "style", "class"]
  });

  return observer;
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => installForcedBrightnessOverwrite());
  } else {
    installForcedBrightnessOverwrite();
  }
}
