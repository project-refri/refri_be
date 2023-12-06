import { Types } from 'mongoose';

export function transferObjectId<T, K extends keyof T>(
  obj: T,
  keys: readonly K[],
) {
  const ret: T = { ...obj };
  for (const key of keys) {
    if (obj[key]) {
      ret[key] = new Types.ObjectId(obj[key] as any) as any;
    }
  }
  return ret;
}
