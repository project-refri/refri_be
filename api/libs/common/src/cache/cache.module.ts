import { Global, Module, Provider, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { caching } from 'cache-manager';
import { MEMORY, MEMORY_CACHE, REDIS_CACHE } from './cache.constant';
import { MemoryCacheService } from './memory-cache.service';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisCacheService } from './redis-cache.service';

const MemoryCacheProvider: Provider = {
  provide: MEMORY_CACHE,
  useFactory: async (configService: ConfigService) => {
    return await caching(MEMORY, {
      ttl: parseInt(configService.get<string>('MEMORY_CACHE_DEFAULT_TTL')),
      max: parseInt(configService.get<string>('MEMORY_CACHE_DEFAULT_MAX')),
    });
  },
  inject: [ConfigService],
  scope: Scope.TRANSIENT,
};

const RedisCacheProvider: Provider = {
  provide: REDIS_CACHE,
  useFactory: async (configService: ConfigService) => {
    return await caching(
      await redisStore({
        url: configService.get<string>('REDIS_URI'),
      }),
    );
  },
  inject: [ConfigService],
};

@Global()
@Module({
  providers: [
    MemoryCacheProvider,
    RedisCacheProvider,
    MemoryCacheService,
    RedisCacheService,
  ],
})
export class CacheModule {}
