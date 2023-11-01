export function deleteProps(obj: any, props: string[]) {
  const ret = { ...obj };
  for (const prop of props) {
    delete ret[prop];
  }
  return ret;
}
