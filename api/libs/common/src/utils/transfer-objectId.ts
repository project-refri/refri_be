import { Types } from 'mongoose';

export function transferObjectId(obj: any, keys: string[]) {
  const ret = { ...obj };
  for (const key of keys) {
    if (obj[key]) {
      ret[key] = new Types.ObjectId(obj[key]);
    }
  }
  return ret;
}
