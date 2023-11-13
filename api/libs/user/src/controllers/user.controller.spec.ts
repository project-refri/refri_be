import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../services/user.service';
import { UserController } from './user.controller';
import { UserRepository } from '../repositories/user.repository';
import { AuthService } from '@app/auth/services/auth.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        { provide: UserRepository, useValue: {} },
        { provide: 'UserModel', useValue: {} },
        { provide: AuthService, useValue: {} },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
