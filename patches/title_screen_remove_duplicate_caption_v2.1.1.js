// Star Ledger Title Screen Hotfix v2.1.1
// Runtime fallback: removes duplicated bottom title caption if it is injected by JS.
// Safe to call after title screen render.

export function removeDuplicateTitleCaption(root = document) {
  const duplicatePhrases = [
    "THE STAR LEDGER IS YOURS TO WRITE",
    "WHAT LEGACY WILL YOU LEAVE"
  ];

  const candidates = Array.from(root.querySelectorAll("body *")).filter((node) => {
    const text = (node.textContent || "").trim().toUpperCase();
    if (!text) return false;
    const hasDuplicatePhrase = duplicatePhrases.some((phrase) => text.includes(phrase));
    if (!hasDuplicatePhrase) return false;

    const rect = node.getBoundingClientRect?.();
    const isBottomBand = rect ? rect.top > window.innerHeight * 0.82 : false;

    return isBottomBand;
  });

  for (const node of candidates) {
    node.remove();
  }

  return candidates.length;
}

export function installDuplicateTitleCaptionGuard() {
  removeDuplicateTitleCaption();

  const observer = new MutationObserver(() => {
    removeDuplicateTitleCaption();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });

  return observer;
}
