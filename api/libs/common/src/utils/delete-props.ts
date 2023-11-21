export function deleteProps<T>(obj: T, props: string[]) {
  const ret: T = { ...obj };
  for (const prop of props) {
    delete ret[prop];
  }
  return ret;
}
