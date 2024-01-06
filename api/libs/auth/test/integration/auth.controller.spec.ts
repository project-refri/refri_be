import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@app/auth/auth.service';
import { AuthController } from '@app/auth/auth.controller';
import { AuthRepository } from '@app/auth/repositories/mongo.auth.repository';
import { UserService } from '@app/user/user.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: {} },
        { provide: AuthRepository, useValue: {} },
        { provide: UserService, useValue: {} },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
