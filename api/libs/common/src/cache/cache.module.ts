import { Module, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheStrategyService } from './cache-strategy.service';
import { caching } from 'cache-manager';
import {
  IngredientCacheDecorator,
  RecipeCacheDecorator,
  UserCacheDecorator,
} from './cache.decorator';

export const MEMORY_CACHE = Symbol('MEMORY_CACHE');
export const MEMORY = 'memory';

@Module({
  imports: [],
  providers: [
    CacheStrategyService,
    UserCacheDecorator,
    IngredientCacheDecorator,
    RecipeCacheDecorator,
    {
      provide: MEMORY_CACHE,
      useFactory: (configService: ConfigService) => {
        return caching(MEMORY, {
          ttl: parseInt(configService.get<string>('MEMORY_CACHE_DEFAULT_TTL')),
          max: parseInt(configService.get<string>('MEMORY_CACHE_DEFAULT_MAX')),
        });
      },
      inject: [ConfigService],
      scope: Scope.TRANSIENT,
    },
  ],
})
export class CacheModule {}
