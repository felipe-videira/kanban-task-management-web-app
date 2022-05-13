import clamp from "../utils/clamp";

export default function useDOMFocus(): [
  nextFocus: () => HTMLElement,
  previousFocus: () => HTMLElement,
  getFocused: () => HTMLElement
] {
  function switchFocus(direction: -1 | 1) {
    const focusableElements = Array.from(
      document.querySelectorAll(
        'a[href], button:not([disabled]), input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
      )
    );

    const currentIndex = focusableElements.findIndex(
      (el) => el === document.activeElement
    );

    const nextEl = focusableElements[
      clamp(currentIndex + direction, 0, focusableElements.length - 1)
    ] as HTMLElement;

    nextEl.focus();

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
