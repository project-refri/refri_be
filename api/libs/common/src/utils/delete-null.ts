export function deleteNull<T>(obj: T) {
  const ret: T = { ...obj };
  for (const prop in obj) {
    if (obj[prop] === null || obj[prop] === undefined) {
      delete ret[prop];
    }
  }
  return ret;
}
