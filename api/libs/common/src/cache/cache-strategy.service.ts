import { Inject, Injectable, Scope } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CacheOptions, QueryType } from './db-cache.decorator';
import { MEMORY_CACHE } from './cache.constant';

@Injectable({ scope: Scope.TRANSIENT })
export class CacheStrategyService {
  constructor(@Inject(MEMORY_CACHE) private readonly cacheManager: Cache) {}

  async read(key: string, args: any, method: any, options?: CacheOptions) {
    const cached = await this.cacheManager.get(key);
    if (cached) {
      return cached;
    }
    const ret = await method(...args);
    await this.cacheManager.set(key, ret, options.ttl);
    return ret;
  }

  async write(key: string, args: any, method: any, options: CacheOptions) {
    const queryType = options.action;
    if (queryType === QueryType.MODIFY_ONE) {
      await this.cacheInvalidateByKey(key);
    } else if (queryType === QueryType.MODIFY_MANY) {
      await this.cacheInvalidateAll();
    }
    return await method(...args);
  }

  async cacheInvalidateByKey(key: string) {
    await this.cacheManager.del(key);
  }

  async cacheInvalidateAll() {
    await this.cacheManager.reset();
  }
}
