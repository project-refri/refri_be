import { Types } from 'mongoose';

export function transferObjectId<T>(obj: T, keys: string[]) {
  const ret: T = { ...obj };
  for (const key of keys) {
    if (obj[key]) {
      ret[key] = new Types.ObjectId(obj[key]);
    }
  }
  return ret;
}
