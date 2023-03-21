import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers/user.controller';
import { User, UserSchema } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
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
