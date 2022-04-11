const USER_SCORE_KEY = "user-score";

export function get(): number {
  return parseInt(localStorage.getItem(USER_SCORE_KEY) || "0");
}

export function save(value: number): void {
  localStorage.setItem(USER_SCORE_KEY, value.toString());
}

export function clear(): void {
  localStorage.removeItem(USER_SCORE_KEY);
}

export function setOnExitSaveListener(listener: () => void): void {
  window.addEventListener("beforeunload", (e) => {
    listener();
    e.returnValue = "";
  });
}
