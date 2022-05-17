import * as storage from "./storage";

const SETTINGS_KEY = "user-settings";

export type Settings = {
  animationsEnabled: boolean;
  useBrowserFont: boolean;
};

export function get(): Settings {
  return storage.getItem(SETTINGS_KEY, {
    animationsEnabled: true,
    useBrowserFont: false,
  });
}

export function save(value: Settings): void {
  storage.setItem(SETTINGS_KEY, value);
}
