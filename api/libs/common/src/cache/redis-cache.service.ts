import { Inject } from '@nestjs/common';
import { CacheOption, REDIS_CACHE } from './cache.constant';
import { Cache } from 'cache-manager';
import {
  Aspect,
  LazyDecorator,
  WrapParams,
  createDecorator,
} from '@toss/nestjs-aop';

export const RedisCacheable = (option: CacheOption) =>
  createDecorator(REDIS_CACHE, { action: 'get', ...option });

@Aspect(REDIS_CACHE)
export class RedisCacheService implements LazyDecorator<any, CacheOption> {
  constructor(@Inject(REDIS_CACHE) private readonly cacheManager: Cache) {}

  wrap({ method, metadata }: WrapParams<any, CacheOption>) {
    return async (...args: any[]) => {
      const key = 'cached:' + metadata.keyGenerator(...args);
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
