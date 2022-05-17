import * as storage from "./storage";

const USER_SCORE_KEY = "user-score";
const HOUSE_SCORE_KEY = "house-score";

export function get(game: string, house = false): number {
  return storage.getItem(
    `${house ? HOUSE_SCORE_KEY : USER_SCORE_KEY}-${game}`,
    0
  );
}

export function save(game: string, value: number, house = false): void {
  storage.setItem(`${house ? HOUSE_SCORE_KEY : USER_SCORE_KEY}-${game}`, value);
}

export function setSaveOnExitListener(
  getValues: () => { game: string; userScore: number; houseScore: number }
): void {
  window.addEventListener("beforeunload", (e) => {
    const values = getValues();
    save(values.game, values.userScore);
    save(values.game, values.houseScore, true);
    e.returnValue = "";
  });
}
