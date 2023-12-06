export function deleteProps<T, K extends keyof T>(obj: T, props: readonly K[]) {
  const ret: T = { ...obj };
  for (const prop of props) {
    delete ret[prop];
  }
  return ret;
}
