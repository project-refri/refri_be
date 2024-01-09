import { ConfigModule } from '@nestjs/config';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
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
import { MongoModule } from '@app/common/mongo/mongo.module';
import { PrismaModule } from '@app/common/prisma/prisma.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test.' : '.env.dev',
    }),
    MongoModule,
    PrismaModule,
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
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
