import { Global, Module, Provider, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheStrategyService } from './cache-strategy.service';
import { caching } from 'cache-manager';
import {
  IngredientCacheDecorator,
  RecipeCacheDecorator,
  UserCacheDecorator,
} from './cache.decorator';
import { MEMORY, MEMORY_CACHE } from './cache.constant';
import { MemoryCacheService } from './memory-cache.service';

const memoryCacheDynamicModule: Provider = {
  provide: MEMORY_CACHE,
  useFactory: (configService: ConfigService) => {
    return caching(MEMORY, {
      ttl: parseInt(configService.get<string>('MEMORY_CACHE_DEFAULT_TTL')),
      max: parseInt(configService.get<string>('MEMORY_CACHE_DEFAULT_MAX')),
    });
  },
  inject: [ConfigService],
  scope: Scope.TRANSIENT,
};

@Global()
@Module({
  imports: [],
  providers: [
    CacheStrategyService,
    UserCacheDecorator,
    IngredientCacheDecorator,
    RecipeCacheDecorator,
    memoryCacheDynamicModule,
    MemoryCacheService,
  ],
  exports: [CacheStrategyService, memoryCacheDynamicModule],
})
export class CacheModule {}
