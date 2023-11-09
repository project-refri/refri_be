import { applyDecorators } from '@nestjs/common';
import { CacheOption } from './cache.constant';
import { RedisCacheable } from './redis-cache.service';
import { MemoryCacheable } from './memory-cache.service';

/**
 * @option
 * @ttl ttl in milliseconds
 * @keyGenerator key generator from arguments
 * @action get | del : default is get
 */
export const Cacheable = (option: CacheOption) =>
  applyDecorators(RedisCacheable(option), MemoryCacheable(option));
