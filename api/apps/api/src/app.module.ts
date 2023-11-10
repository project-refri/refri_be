import { ConfigModule } from '@nestjs/config';
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
import { RedisModule } from '@app/common/redis.module';
import { MongoModule } from '@app/common/mongo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test.' : '.env.dev',
    }),
    MongoModule,
    RedisModule,
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
