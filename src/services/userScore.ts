const USER_SCORE_KEY = "user-score";

export function get(game: string): number {
  return parseInt(localStorage.getItem(`${USER_SCORE_KEY}-${game}`) || "0");
}

export function save(game: string, value: number): void {
  localStorage.setItem(`${USER_SCORE_KEY}-${game}`, value.toString());
}

export function setOnExitSaveListener(listener: () => void): void {
  window.addEventListener("beforeunload", (e) => {
    listener();
    e.returnValue = "";
  });
}
