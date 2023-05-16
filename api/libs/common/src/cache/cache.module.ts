import { Module, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  UserCacheProvider,
  IngredientCacheProvider,
  RecipeCacheProvider,
} from './providers/db-cache.aspect';
import { CacheStrategyService } from './providers/cache-strategy.service';
import { caching } from 'cache-manager';
import { MEMORY, MEMORY_CACHE } from './types/cache.constants';

@Module({
  imports: [],
  providers: [
    CacheStrategyService,
    UserCacheProvider,
    IngredientCacheProvider,
    RecipeCacheProvider,
    {
      provide: MEMORY_CACHE,
      useFactory: (configService: ConfigService) => {
        return caching(MEMORY, {
          ttl: configService.get<number>('MEMORY_CACHE_DEFAULT_TTL'),
          max: configService.get<number>('MEMORY_CACHE_DEFAULT_MAX'),
        });
      },
      inject: [ConfigService],
      scope: Scope.TRANSIENT,
    },
  ],
  exports: [CacheStrategyService],
})
export class CacheModule {}
