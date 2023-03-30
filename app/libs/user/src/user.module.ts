import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers/user.controller';
import { User, UserSchema } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: (configService: ConfigService) => {
          const schema = UserSchema;
          schema.path('thumbnail').default = () =>
            `https://${configService.get<string>(
              'AWS_S3_IMAGE_MAIN_BUCKET',
            )}.s3.amazonaws.com/default-user-thumbnail.jpg`;
          return schema;
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    {
      provide: 'UserSchema',
      useValue: UserSchema,
    },
  ],
  exports: [
    UserService,
    UserRepository,
    {
      provide: 'UserSchema',
      useValue: UserSchema,
    },
  ],
})
export class UserModule {}
