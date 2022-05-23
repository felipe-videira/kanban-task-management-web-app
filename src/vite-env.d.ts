/// <reference types="vite/client" />

type ExtendableEvent = any;

type GameOption = {
  name: string;
  icon: string;
  color: string[] | string;
  winRules: {
    [key: string]: boolean;
  };
} | null;

type Game = {
  name: string;
  settings: {
    showHouseChoiceDelay: number;
    showHouseChoiceDuration: number;
    showResultDelay: number;
    showResultDuration: number;
    updateScoreDelay: number;
    winnerBackgroundEffectDelay: number;
  };
  translations: {
    [language: string]: {
      [key: string]: any;
    };
  };
  listSetup: {
    pointingUp: boolean;
  };
  options: NonNullable<GameOption>[];
} | null;
