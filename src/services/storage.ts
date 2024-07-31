const PREFIX = "kb-app-";

export function getItem<T>(key: string): T | undefined;
export function getItem<T>(key: string, defaultValue: T): T;

export function getItem<T>(key: string, defaultValue?: T): T | undefined {
  const value = localStorage.getItem(PREFIX + key);
  return value ? JSON.parse(value) : defaultValue || value;
}

export function setItem<T>(key: string, value: T): void {
  localStorage.setItem(PREFIX + key, JSON.stringify(value));
}
