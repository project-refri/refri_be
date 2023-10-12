export function deleteNull(obj: any) {
  for (const prop in obj) {
    if (obj[prop] === null || obj[prop] === undefined) {
      delete obj[prop];
    }
  }
}
