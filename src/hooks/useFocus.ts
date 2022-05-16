import clamp from "../utils/clamp";

export default function useDOMFocus(): [
  nextFocus: () => HTMLElement,
  previousFocus: () => HTMLElement,
  getFocused: () => HTMLElement
] {
  function switchFocus(direction: -1 | 1, currentIndex = -1): HTMLElement {
    const focusableElements = Array.from(
      document.querySelectorAll(
        'a[href]:not([tabindex="-1"]), button:not([tabindex="-1"]):not([disabled]), input:not([tabindex="-1"]):not([disabled]), textarea:not([tabindex="-1"]):not([disabled]), select:not([tabindex="-1"]):not([disabled]), details, [tabindex]:not([tabindex="-1"])'
      )
    );

    if (currentIndex < 0) {
      currentIndex = focusableElements.findIndex(
        (el) => el === document.activeElement
      );
    }
    const nextIndex = clamp(
      currentIndex + direction,
      0,
      focusableElements.length - 1
    );

    const nextEl = focusableElements[nextIndex] as HTMLElement;

    nextEl.focus();

    if (document.activeElement !== nextEl) {
      return switchFocus(direction, nextIndex);
    }

    return nextEl;
  }

  function nextFocus() {
    return switchFocus(1);
  }

  function previousFocus() {
    return switchFocus(-1);
  }

  function getFocused() {
    return document.activeElement as HTMLElement;
  }

  return [nextFocus, previousFocus, getFocused];
}
