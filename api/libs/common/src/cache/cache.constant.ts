export const MEMORY = 'memory';

export const MEMORY_CACHE = Symbol('MEMORY_CACHE');
export const REDIS_CACHE = Symbol('REDIS_CACHE');
export const CACHE = Symbol('CACHE');

/**
 * @ttl time to live in milliseconds
 */
export interface CacheOption {
  ttl?: number;
  keyGenerator: (...args: any[]) => string;
  action?: 'get' | 'del';
}
