import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UserModule } from '@app/user/user.module';
import { AuthModule } from '@app/auth/auth.module';
import { ImageModule } from '@app/image/image.module';
import { IngredientModule } from '@app/ingredient/ingredient.module';
import { RecipeModule } from '@app/recipe/recipe.module';
import { CacheModule } from '@app/common/cache/cache.module';
import { LogModule } from '@app/common/log/log.module';
import { AopModule } from '@toss/nestjs-aop';
import { NotiModule } from '@app/noti/noti.module';

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
    AopModule,
    CacheModule,
    LogModule,
    UserModule,
    AuthModule,
    ImageModule,
    IngredientModule,
    RecipeModule,
    NotiModule,
  ],
})
export class AppModule {}
