import * as storage from "./storage";

const USER_SCORE_KEY = "user-score";

export function get(game: string): number {
  return storage.getItem(`${USER_SCORE_KEY}-${game}`, 0);
}

export function save(game: string, value: number): void {
  storage.setItem(`${USER_SCORE_KEY}-${game}`, value);
}

export function setSaveOnExitListener(
  getValues: () => { game: string; score: number }
): void {
  window.addEventListener("beforeunload", (e) => {
    const values = getValues();
    save(values.game, values.score);
    e.returnValue = "";
  });
}
