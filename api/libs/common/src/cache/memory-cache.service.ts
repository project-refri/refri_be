import { Inject } from '@nestjs/common';
import { MEMORY_CACHE } from './cache.constant';
import { Cache } from 'cache-manager';
import {
  Aspect,
  LazyDecorator,
  WrapParams,
  createDecorator,
} from '@toss/nestjs-aop';

/**
 * @ttl time to live in milliseconds
 */
export type CacheOption = {
  ttl: number;
  generateKey: (...args: any[]) => string;
};

export const Cacheable = (option: CacheOption) =>
  createDecorator(MEMORY_CACHE, option);

@Aspect(MEMORY_CACHE)
export class MemoryCacheService implements LazyDecorator<any, CacheOption> {
  constructor(@Inject(MEMORY_CACHE) private readonly cacheManager: Cache) {}

  wrap({ method, metadata }: WrapParams<any, CacheOption>) {
    return async (...args: any[]) => {
      const key = metadata.generateKey(...args);
      const cached = await this.cacheManager.get(key);
      if (cached) return cached;
      const ret = await method(...args);
      await this.cacheManager.set(key, ret, metadata.ttl);
      return ret;
    };
  }
}
