import { applyAspectDecorator } from '@app/common/aop/aop.decorator';
import { CacheOptions } from '../types/cache-options.type';
import {
  IngredientCacheProvider,
  RecipeCacheProvider,
  UserCacheProvider,
  USER_CACHE_ASPECT,
} from '../providers/db-cache.aspect';

export const CACHE_OPTIONS = Symbol('CACHE_OPTIONS');
export const USER_CACHE_DECORATOR = Symbol('USER_CACHE_DECORATOR');
export const USER_INGREDIENT_CACHE_DECORATOR = Symbol(
  'USER_INGREDIENT_CACHE_DECORATOR',
);
export const RECIPE_CACHE_DECORATOR = Symbol('RECIPE_CACHE_DECORATOR');

export const CACHE_METADATA_KEY = 'CACHE_METADATA_KEY';

export const UserCacheable = (options: CacheOptions) =>
  applyAspectDecorator(
    USER_CACHE_ASPECT,
    UserCacheProvider,
    CACHE_METADATA_KEY,
    options,
  );

export const UserIngredientCacheable = (options: CacheOptions) =>
  applyAspectDecorator(
    USER_INGREDIENT_CACHE_DECORATOR,
    IngredientCacheProvider,
    CACHE_METADATA_KEY,
    options,
  );

export const RecipeCacheable = (options: CacheOptions) =>
  applyAspectDecorator(
    RECIPE_CACHE_DECORATOR,
    RecipeCacheProvider,
    CACHE_METADATA_KEY,
    options,
  );
