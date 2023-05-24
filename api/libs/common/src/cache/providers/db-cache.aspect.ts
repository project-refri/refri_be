import { CacheOptions } from '../types/cache-options.type';
import { CacheStrategyService } from './cache-strategy.service';
import { QueryType } from '../types/query.type';
import { IAspectProvider, WrapParams } from '../../aop/aop.interface';
import { Injectable } from '@nestjs/common';

export const CACHE_ASPECT = Symbol('CACHE_ASPECT');
export const USER_CACHE_ASPECT = Symbol('USER_CACHE_ASPECT');
export const INGREDIENT_CACHE_ASPECT = Symbol('INGREDIENT_CACHE_ASPECT');
export const RECIPE_CACHE_ASPECT = Symbol('RECIPE_CACHE_ASPECT');

@Injectable()
export class DbCacheProvider implements IAspectProvider<any, any> {
  constructor(readonly cacheService: CacheStrategyService) {
    this.cacheService = cacheService;
  }

  wrap({
    method,
    metadata: options,
  }: WrapParams<any, { CACHE_METADATA_KEY: CacheOptions }>) {
    return async (...args: any[]) => {
      const cacheMetadata = options.CACHE_METADATA_KEY;
      const key = this.trackBy(args[cacheMetadata.keyIdx]);
      let ret = null;

      switch (cacheMetadata.action) {
        case QueryType.FIND_ONE:
        case QueryType.FIND_MANY:
          ret = await this.cacheService.lookAside(
            key,
            args,
            method,
            cacheMetadata,
          );
          break;
        case QueryType.MODIFY_ONE:
          await this.cacheService.cacheInvalidateByKey(key);
          ret = await method(...args);
          break;
        case QueryType.MODIFY_MANY:
          await this.cacheService.cacheInvalidateAll();
          ret = await method(...args);
          break;
        default:
          throw new Error('Invalid caching action');
      }
      return ret;
    };
  }

  trackBy(source: any): string {
    return JSON.stringify(source);
  }
}

@Injectable()
export class UserCacheProvider extends DbCacheProvider {
  constructor(readonly cacheService: CacheStrategyService) {
    super(cacheService);
  }
}

@Injectable()
export class IngredientCacheProvider extends DbCacheProvider {
  constructor(readonly cacheService: CacheStrategyService) {
    super(cacheService);
  }
}

@Injectable()
export class RecipeCacheProvider extends DbCacheProvider {
  constructor(readonly cacheService: CacheStrategyService) {
    super(cacheService);
  }
}
