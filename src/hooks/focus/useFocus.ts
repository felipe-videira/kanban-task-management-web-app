import { useEffect, useContext } from "react";
import useElementRefList from "./useElementRefList";
import { FocusContext } from "./focusProvider";

export default function useFocus(): [
  focusListRef: React.RefCallback<HTMLElement | null>,
  keyFocusListRef: React.RefCallback<HTMLElement | null>
] {
  const { setFocusList, setKeyFocusList } = useContext(FocusContext);

  const [focusRefList, focusListRef] = useElementRefList();
  const [keyFocusRefList, addTokeyFocusRefList] = useElementRefList();

  function keyFocusListRef(instance: HTMLElement | null) {
    focusListRef(instance);
    addTokeyFocusRefList(instance);
  }

  useEffect(() => {
    if ((focusRefList.current?.list || []).length > 0) {
      setFocusList(focusRefList);
    }
    if (keyFocusRefList.current) {
      setKeyFocusList(keyFocusRefList);
    }
  }, [focusRefList.current, keyFocusRefList.current]);

  return [focusListRef, keyFocusListRef];
}
