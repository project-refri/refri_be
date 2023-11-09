import { Global, Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MongoModule implements OnApplicationShutdown {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onApplicationShutdown(signal?: string) {
    console.log('MongoModule.onApplicationShutdown', signal);
    await this.connection.close();
  }
}
