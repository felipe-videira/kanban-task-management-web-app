const USER_SCORE_KEY = "user-score";
const HOUSE_SCORE_KEY = "house-score";

export function get(game: string, house = false): number {
  return parseInt(
    localStorage.getItem(
      `${house ? HOUSE_SCORE_KEY : USER_SCORE_KEY}-${game}`
    ) || "0"
  );
}

export function save(game: string, value: number, house = false): void {
  localStorage.setItem(
    `${house ? HOUSE_SCORE_KEY : USER_SCORE_KEY}-${game}`,
    value.toString()
  );
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
