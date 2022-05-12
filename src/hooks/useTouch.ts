import { useEffect, DependencyList, useRef } from "react";

type Touch = {
  count: number;
  doubleTap: boolean;
  swipe: boolean;
  swipeDirection: {
    x: 1 | 0 | -1;
    y: 1 | 0 | -1;
  };
};

const MIN_DIST_TO_SWIPE = 50;

export default function useTouch(
  onTouch: (touch: Touch) => void,
  deps: DependencyList
) {
  const touchCount = useRef(0);
  const swipeDir = useRef({ x: 0, y: 0 });
  const startPosition = useRef({
    x: 0,
    y: 0,
  });
  const swipeStarted = useRef(false);
  const doubleTapStarted = useRef(false);

  function handleTouchStart(event: TouchEvent) {
    swipeStarted.current = false;
    touchCount.current = event.touches.length;
    startPosition.current = {
      x: event.touches[0].screenX,
      y: event.touches[0].screenY,
    };
  }

  function handleTouchMove(event: TouchEvent) {
    swipeStarted.current = true;

    const xDiff = event.touches[0].screenX - startPosition.current.x;
    const yDiff = startPosition.current.y - event.touches[0].screenY;

    swipeDir.current = {
      x: Math.abs(xDiff) >= MIN_DIST_TO_SWIPE ? Math.sign(xDiff) : 0,
      y: Math.abs(yDiff) >= MIN_DIST_TO_SWIPE ? Math.sign(yDiff) : 0,
    };
  }

  function handleTouchEnd() {
    onTouch({
      count: touchCount.current,
      doubleTap: doubleTapStarted.current,
      swipe: swipeStarted.current,
      swipeDirection: swipeDir.current as Touch["swipeDirection"],
    });

    if (!doubleTapStarted.current) {
      doubleTapStarted.current = true;

      setTimeout(() => {
        doubleTapStarted.current = false;
      }, 300);
    }
  }

  useEffect(() => {
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, deps);
}
