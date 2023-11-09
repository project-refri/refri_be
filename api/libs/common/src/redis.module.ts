import {
  Global,
  Inject,
  Module,
  OnApplicationShutdown,
  Provider,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';

export const REDIS_PROVIDER = Symbol('REDIS_PROVIDER');

const RedisProvider: Provider = {
  provide: REDIS_PROVIDER,
  useFactory: async (configService: ConfigService) => {
    return await createClient({
      url: configService.get<string>('REDIS_URI'),
    }).connect();
  },
  inject: [ConfigService],
};

@Global()
@Module({
  providers: [RedisProvider],
  exports: [RedisProvider],
})
export class RedisModule implements OnApplicationShutdown {
  constructor(
    @Inject(REDIS_PROVIDER) private readonly client: RedisClientType,
  ) {}
  async onApplicationShutdown(signal?: string) {
    console.log('RedisModule.onApplicationShutdown', signal);
    await this.client.quit();
  }
}
