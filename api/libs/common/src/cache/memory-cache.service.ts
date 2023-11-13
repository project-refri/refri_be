import { Inject } from '@nestjs/common';
import { CacheOption, MEMORY_CACHE } from './cache.constant';
import { Cache } from 'cache-manager';
import {
  Aspect,
  LazyDecorator,
  WrapParams,
  createDecorator,
} from '@toss/nestjs-aop';

export const MemoryCacheable = (option: CacheOption) =>
  createDecorator(MEMORY_CACHE, { action: 'get', ...option });

@Aspect(MEMORY_CACHE)
export class MemoryCacheService implements LazyDecorator<any, CacheOption> {
  constructor(@Inject(MEMORY_CACHE) private readonly cacheManager: Cache) {}

  wrap({ method, metadata }: WrapParams<any, CacheOption>) {
    return async (...args: any[]) => {
      const key = metadata.keyGenerator(...args);
      if (metadata.action === 'get') {
        const cached = await this.cacheManager.get(key);
        if (cached) return cached;
      } else if (metadata.action === 'del') {
        await this.cacheManager.del(key);
      }
      const ret = await method(...args);
      if (metadata.action === 'get') {
        if (!ret) return ret;
        else await this.cacheManager.set(key, ret, metadata.ttl);
      }
      return ret;
    };
  }
}
