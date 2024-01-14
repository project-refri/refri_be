import { TestBed } from '@automock/jest';
import { AuthService } from '@app/auth/auth.service';
import { AuthRepository } from '@app/auth/repositories/auth.repository';
import { UserService } from '@app/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '@app/user/domain/user.entity';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { LoginSessionDto } from '@app/auth/dto/token.dto';
import { OAuthLoginSessionDto } from '@app/auth/dto/oauth.dto';
import { UserDto } from '@app/user/dto/user.dto';
import { SessionEntity } from '@app/auth/domain/session.entity';
import { Diet } from '@prisma/client';

jest.mock('uuid', () => ({
  v4: () => 'mock-uuid',
}));

describe('AuthService', () => {
  let service: AuthService;
  let authRepository: jest.Mocked<AuthRepository>;
  let userService: jest.Mocked<UserService>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(AuthService).compile();

    service = unit;
    authRepository = unitRef.get(AuthRepository);
    userService = unitRef.get(UserService);
    jwtService = unitRef.get(JwtService);
  });

  describe('register', () => {
    it('should register a new user and return a login response', async () => {
      const createUserDto: CreateUserDto = new CreateUserDto();
      const user: UserEntity = {
        id: 1,
        email: 'test@test.com',
        username: 'test',
        introduction: '',
        diet: Diet.NORMAL,
        thumbnail: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const loginSessionDto: LoginSessionDto = new LoginSessionDto();
      userService.create.mockResolvedValue(user);
      service.login = jest.fn().mockResolvedValue(loginSessionDto);

      const result = await service.register(createUserDto);

      expect(userService.create).toHaveBeenCalledWith(createUserDto);
      expect(service.login).toHaveBeenCalledWith(user);
      expect(result).toEqual(loginSessionDto);
    });
  });

  describe('login', () => {
    it('should create a new session and return a login response', async () => {
      const user: UserEntity = {
        id: 1,
        email: 'test@test.com',
        username: 'test',
        introduction: '',
        diet: Diet.NORMAL,
        thumbnail: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const sessToken = 'mock-uuid';
      const loginSessionDto: LoginSessionDto = {
        sessionToken: sessToken,
        user: UserDto.fromEntity(user),
      };
      authRepository.create.mockResolvedValueOnce({
        id: 1,
        sessionToken: sessToken,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as SessionEntity);

      const result = await service.login(user);

      expect(authRepository.create).toHaveBeenCalledWith({
        userId: user.id,
        sessionToken: sessToken,
      });
      expect(result).toEqual(loginSessionDto);
    });
  });

  describe('OAuthLoginByEmail', () => {
    it('should return whether user exists and login result', async () => {
      const email = 'test@test.com';
      const username = 'test';
      const user: UserEntity = {
        id: 1,
        email,
        username,
        introduction: '',
        diet: Diet.NORMAL,
        thumbnail: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const loginSessionDto: LoginSessionDto = {
        sessionToken: 'sessToken',
        user,
      };
      const oAuthLoginSessionDto: OAuthLoginSessionDto = {
        isExist: true,
        ...loginSessionDto,
      };
      userService.findByEmail.mockResolvedValue(user);
      service.login = jest.fn().mockResolvedValue(loginSessionDto);

      const result = await service.OAuthLoginByEmail({ email, username });

      expect(userService.findByEmail).toHaveBeenCalledWith(email);
      expect(service.login).toHaveBeenCalledWith(user);
      expect(result).toEqual(oAuthLoginSessionDto);
    });

    it('should return whether user does not exist', async () => {
      const email = 'test@test.com';
      const username = 'test';
      const expectedResponse = {
        isExist: false,
        registerToken: 'register_token',
      };
      jwtService.sign.mockReturnValue('register_token');
      userService.findByEmail.mockResolvedValue(undefined);

      const result = await service.OAuthLoginByEmail({ email, username });

      expect(userService.findByEmail).toHaveBeenCalledWith(email);
      expect(jwtService.sign).toHaveBeenCalledWith({ sub: email, username });
      expect(result).toEqual(expectedResponse);
    });
  });
});
