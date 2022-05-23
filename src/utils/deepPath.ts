export function deepFind(obj: { [key: string]: any }, path: string): any {
  const paths = path.split(".");
  let current = obj;

  for (let i = 0, len = paths.length; i < len; ++i) {
    if (current[paths[i]] == undefined) {
      return undefined;
    } else {
      current = current[paths[i]];
    }
  }

  return current;
}
