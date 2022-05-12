import { ReactNode, useRef } from "react";
import clamp from "../../utils/clamp";
import { ElementRefList } from "./useElementRefList";
import { FocusProvider } from "./focusProvider";

export default function useFocusProvider(
  initialFocusRefList: React.MutableRefObject<HTMLElement>[] = [],
  initialKeyFocusRefList: React.MutableRefObject<HTMLElement>[] = []
): [
  Provider: ({ children }: { children: ReactNode }) => JSX.Element,
  nextFocus: () => void,
  previousFocus: () => void,
  nextKeyFocus: () => void,
  previousKeyFocus: () => void,
  clickFocused: () => void,
  focusRefList: React.MutableRefObject<React.MutableRefObject<HTMLElement>[]>,
  keyFocusRefList: React.MutableRefObject<
    React.MutableRefObject<HTMLElement>[]
  >,
  focusedElementRef: React.MutableRefObject<HTMLElement | null | undefined>
] {
  const focusRefList = useRef(initialFocusRefList);
  const keyFocusRefList = useRef(initialKeyFocusRefList);
  const focusedElementRef = useRef<HTMLElement | null>();

  function setFocusList(value: ElementRefList) {
    focusRefList.current = value.current?.list || [];
  }

  function setKeyFocusList(value: ElementRefList) {
    keyFocusRefList.current = value.current?.list || [];
  }

  function switchFocus(
    list: React.MutableRefObject<HTMLElement>[],
    direction: -1 | 1
  ) {
    if (list.length > 0) {
      let nextIndex = 0;

      if (focusedElementRef) {
        nextIndex = clamp(
          list.findIndex((el) => el.current === focusedElementRef.current) +
            direction,
          0,
          list.length - 1
        );
      }

      focusedElementRef.current = list[nextIndex].current;
      focusedElementRef.current?.focus();
    }
  }

  function nextFocus() {
    switchFocus(focusRefList.current, 1);
  }

  function previousFocus() {
    switchFocus(focusRefList.current, -1);
  }

  function nextKeyFocus() {
    switchFocus(keyFocusRefList.current, 1);
  }

  function previousKeyFocus() {
    switchFocus(keyFocusRefList.current, -1);
  }

  function clickFocused() {
    if (focusedElementRef.current) {
      focusedElementRef.current.click();
    }
  }

  function Provider({ children }: { children: ReactNode }) {
    return (
      <FocusProvider value={{ setFocusList, setKeyFocusList }}>
        {children}
      </FocusProvider>
    );
  }

  return [
    Provider,
    nextFocus,
    previousFocus,
    nextKeyFocus,
    previousKeyFocus,
    clickFocused,
    focusRefList,
    keyFocusRefList,
    focusedElementRef,
  ];
}
