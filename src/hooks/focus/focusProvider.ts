import { createContext } from "react";
import { ElementRefList } from "./useElementRefList";

const Context = createContext<{
  setFocusList: (value: ElementRefList) => void;
  setKeyFocusList: (value: ElementRefList) => void;
}>({
  setFocusList: () => {},
  setKeyFocusList: () => {},
});

export const FocusContext = Context;
export const FocusProvider = Context.Provider;
