import { createContext } from "react";

const Context = createContext({
  animationsEnabled: true,
  useBrowserFont: false,
});

export const SettingsContext = Context;
export const SettingsProvider = Context.Provider;
