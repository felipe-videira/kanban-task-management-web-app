import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import enUS from "./translations/en-US.json";

const resources = {
  en: {
    common: enUS,
  },
};

i18next
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    ns: ["common", "selectedGame"],
    defaultNS: "common",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["navigator"],
    },
  });

export function addTranslation(game: NonNullable<Game>) {
  for (const key in game.translations) {
    i18next.addResourceBundle(key, "selectedGame", game.translations[key]);
  }
}
