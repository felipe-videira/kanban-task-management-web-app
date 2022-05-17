export function getItem<T>(key: string): T | undefined;
export function getItem<T>(key: string, defaultValue: T): T;

export function getItem<T>(key: string, defaultValue?: T): T | undefined {
  return JSON.parse(localStorage.getItem(key) || "false") || defaultValue;
}

export function setItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}
