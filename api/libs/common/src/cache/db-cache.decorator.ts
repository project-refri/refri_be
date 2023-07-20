import { CacheStrategyService } from './cache-strategy.service';
import { LazyDecorator, WrapParams } from '@toss/nestjs-aop';

export type CacheOptions = {
  action: QueryType;
  ttl?: number;
  keyIdx: number;
};

export enum QueryType {
  FIND_ONE = 'FIND_ONE',
  FIND_MANY = 'FIND_MANY',
  MODIFY_ONE = 'MODIFY_ONE',
  MODIFY_MANY = 'MODIFY_MANY',
}

export class DbCacheDecorator implements LazyDecorator<any, any> {
  constructor(private readonly cacheService: CacheStrategyService) {}

  wrap({ method, metadata: options }: WrapParams<any, CacheOptions>) {
    return async (...args: any[]) => {
      const key = this.trackBy(args[options.keyIdx]);
      let ret = null;

      switch (options.action) {
        case QueryType.FIND_ONE:
        case QueryType.FIND_MANY:
          ret = await this.cacheService.read(key, args, method, options);
          break;
        case QueryType.MODIFY_ONE:
        case QueryType.MODIFY_MANY:
          ret = await this.cacheService.write(key, args, method, options);
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
