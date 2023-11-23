import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers/user.controller';
import {
  User,
  UserSchema,
  UserSchemaFactory,
} from './entities/mongo.user.entity';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: UserSchemaFactory,
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
    {
      provide: 'UserSchema',
      useValue: UserSchema,
    },
  ],
})
export class UserModule {}
