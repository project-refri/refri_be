import { CacheStrategyService } from './cache-strategy.service';
import { CacheOptions, DbCacheDecorator } from './db-cache.decorator';
import { Aspect, createDecorator } from '@toss/nestjs-aop';

export const USER_CACHE = Symbol('USER_CACHE');
export const USER_INGREDIENT_CACHE = Symbol('USER_INGREDIENT_CACHE');
export const RECIPE_CACHE = Symbol('RECIPE_CACHE');

@Aspect(USER_CACHE)
export class UserCacheDecorator extends DbCacheDecorator {
  constructor(private readonly cache: CacheStrategyService) {
    super(cache);
  }
}

@Aspect(USER_INGREDIENT_CACHE)
export class IngredientCacheDecorator extends DbCacheDecorator {
  constructor(private readonly cache: CacheStrategyService) {
    super(cache);
  }
}

@Aspect(RECIPE_CACHE)
export class RecipeCacheDecorator extends DbCacheDecorator {
  constructor(private readonly cache: CacheStrategyService) {
    super(cache);
  }
}

export const UserCacheable = (options: CacheOptions) =>
  createDecorator(USER_CACHE, options);

export const UserIngredientCacheable = (options: CacheOptions) =>
  createDecorator(USER_INGREDIENT_CACHE, options);

export const RecipeCacheable = (options: CacheOptions) =>
  createDecorator(RECIPE_CACHE, options);
