import { Global, Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { MongoService } from './mongo.service';
import { MongoTransactionService } from '../transaction/mongo-transaction.service';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (
        configService: ConfigService,
        mongoService: MongoService,
      ) => ({
        uri: configService.get<string>('DATABASE_URI'),
        connectionFactory: (conn: Connection) => {
          conn.plugin(mongoService.addSessionPlugin.bind(mongoService));
          return conn;
        },
      }),
      inject: [ConfigService, MongoService],
    }),
  ],
  providers: [MongoService, MongoTransactionService],
  exports: [MongoService, MongoTransactionService],
})
export class MongoModule implements OnApplicationShutdown {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onApplicationShutdown(signal?: string) {
    console.log('MongoModule.onApplicationShutdown', signal);
    await this.connection.close();
  }
}
