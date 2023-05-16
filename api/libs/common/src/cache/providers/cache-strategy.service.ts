import { Inject, Injectable, Scope } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CacheOptions } from '../types/cache-options.type';
import { MEMORY_CACHE } from '../types/cache.constants';

@Injectable({ scope: Scope.TRANSIENT })
export class CacheStrategyService {
  constructor(@Inject(MEMORY_CACHE) private readonly cacheManager: Cache) {}

  async lookAside(key: string, args: any, method: any, options?: CacheOptions) {
    const cached = await this.cacheManager.get(key);
    if (cached) {
      return cached;
    }
    const ret = await method(...args);
    await this.cacheManager.set(key, ret, options.ttl);
    return ret;
  }

  async cacheInvalidateByKey(key: string) {
    await this.cacheManager.del(key);
  }

  async cacheInvalidateAll() {
    await this.cacheManager.reset();
  }
}
