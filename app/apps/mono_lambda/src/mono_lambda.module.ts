import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UserModule } from '@app/user/user.module';
import { AuthModule } from '@app/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URI'),
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test.' : '.env.dev',
    }),
    UserModule,
    AuthModule,
  ],
})
export class MonoLambdaModule {}
