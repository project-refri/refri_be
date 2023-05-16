import { QueryType } from './query.type';

export type CacheOptions = {
  action: QueryType;
  ttl?: number;
  keyIdx: number;
};
