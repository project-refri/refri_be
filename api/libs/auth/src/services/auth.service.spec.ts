import { TestBed } from '@automock/jest';
import { AuthService } from './auth.service';
import { AuthRepository } from '../repositories/auth.repository';
import { UserService } from '@app/user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@app/user/entities/user.entity';
import { CreateUserDto } from '@app/user/dto/modify-user.dto';
import { Schema } from 'mongoose';
import { LoginSessionDto } from '../dto/token.dto';
import { Session } from '../entities/session.entity';
import { OAuthLoginSessionDto } from '../dto/oauth.dto';

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
      const user: User = new User();
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
      const user: User = {
        ...new User(),
        id: new Schema.Types.ObjectId('id'),
      };
      const sessToken = 'mock-uuid';
      const loginSessionDto: LoginSessionDto = {
        session_token: sessToken,
        user,
      };
      authRepository.create.mockResolvedValueOnce(new Session());

      const result = await service.login(user);

      expect(authRepository.create).toHaveBeenCalledWith({
        user_id: user.id.toString(),
        session_token: sessToken,
      });
      expect(result).toEqual(loginSessionDto);
    });
  });

  describe('OAuthLoginByEmail', () => {
    it('should return whether user exists and login result', async () => {
      const email = 'test@test.com';
      const username = 'test';
      const user = new User();
      user.email = email;
      user.username = username;

      const loginSessionDto: LoginSessionDto = {
        session_token: 'sessToken',
        user,
      };
      const oAuthLoginSessionDto: OAuthLoginSessionDto = {
        is_exist: true,
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
        is_exist: false,
        register_token: 'register_token',
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
