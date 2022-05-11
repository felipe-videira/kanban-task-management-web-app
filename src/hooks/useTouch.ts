import { useEffect, DependencyList, useRef } from "react";

type Touch = {
  count: number;
  doubleTap: boolean;
  swipe: boolean;
  swipeDirection: {
    x: number;
    y: number;
  };
};

export default function useTouch(
  onTouch: (touch: Touch) => void,
  deps: DependencyList
) {
  const touchCount = useRef(0);
  const swipeDir = useRef({ x: 0, y: 0 });
  const lastScreenPos = useRef({
    x: 0,
    y: 0,
  });
  const swipeStarted = useRef(false);
  const doubleTapStarted = useRef(false);

  function handleTouchStart(event: TouchEvent) {
    swipeStarted.current = false;
    touchCount.current = event.touches.length;
  }

  function handleTouchMove(event: TouchEvent) {
    swipeStarted.current = true;
    swipeDir.current = {
      x: Math.sign(event.touches[0].screenX - lastScreenPos.current.x),
      y: Math.sign(lastScreenPos.current.y - event.touches[0].screenY),
    };
    lastScreenPos.current = {
      x: event.touches[0].screenX,
      y: event.touches[0].screenY,
    };
  }

  function handleTouchEnd() {
    onTouch({
      count: touchCount.current,
      doubleTap: doubleTapStarted.current,
      swipe: swipeStarted.current,
      swipeDirection: swipeDir.current,
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
