export function deleteNull(obj: any) {
  const ret = { ...obj };
  for (const prop in obj) {
    if (obj[prop] === null || obj[prop] === undefined) {
      delete ret[prop];
    }
  }
  return ret;
}
