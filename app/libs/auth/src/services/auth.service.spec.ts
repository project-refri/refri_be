import { TestBed } from '@automock/jest';
import { AuthService } from './auth.service';
import { AuthRepository } from '../repositories/auth.repository';
import { UserService } from '@app/user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@app/user/entities/user.entity';
import { CreateUserDto } from '@app/user/dto/modify-user.dto';
import { LoginResDto } from '../dto/token.dto';
import { RefreshToken } from '../entities/refresh-token.entity';
import { Schema } from 'mongoose';
import { OAuthLoginResDto } from '../dto/oauth.dto';

jest.mock('uuid', () => ({
  v4: () => 'mock-uuid',
}));

describe('AuthService', () => {
  let service: AuthService;
  let authRepository: jest.Mocked<AuthRepository>;
  let userService: jest.Mocked<UserService>;
  let jwtService: jest.Mocked<JwtService>;
  let configService: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(AuthService).compile();

    service = unit;
    authRepository = unitRef.get(AuthRepository);
    userService = unitRef.get(UserService);
    jwtService = unitRef.get(JwtService);
    configService = unitRef.get(ConfigService);
  });

  describe('register', () => {
    it('should register a new user and return a login response', async () => {
      const createUserDto: CreateUserDto = new CreateUserDto();
      const user: User = new User();
      const loginResDto: LoginResDto = new LoginResDto();
      userService.create.mockResolvedValue(user);
      service.login = jest.fn().mockResolvedValue(loginResDto);

      const result = await service.register(createUserDto);

      expect(userService.create).toHaveBeenCalledWith(createUserDto);
      expect(service.login).toHaveBeenCalledWith(user);
      expect(result).toEqual(loginResDto);
    });
  });

  describe('login', () => {
    it('should create a new refresh token and return a login response', async () => {
      const user: User = {
        ...new User(),
        id: new Schema.Types.ObjectId('id'),
      };
      const accessToken = 'mock-access-token';
      const refreshToken = 'mock-refresh-token';
      const jwtPayload = { sub: user.id.toString() };
      const jwtRefreshPayload = {
        sub: user.id.toString(),
        uuid: 'mock-uuid',
      };
      const expiresIn = 3600;
      const loginResDto: LoginResDto = {
        token: {
          access_token: accessToken,
          refresh_token: refreshToken,
        },
        user,
      };
      jwtService.sign.mockReturnValueOnce(accessToken);
      jwtService.sign.mockReturnValueOnce(refreshToken);
      configService.get.mockReturnValueOnce(expiresIn);
      authRepository.create.mockResolvedValueOnce(new RefreshToken());

      const result = await service.login(user);

      expect(jwtService.sign).toHaveBeenNthCalledWith(1, jwtPayload);
      expect(jwtService.sign).toHaveBeenNthCalledWith(2, jwtRefreshPayload, {
        expiresIn,
      });
      expect(authRepository.create).toHaveBeenCalledWith({
        refresh_token: refreshToken,
        uuid: jwtRefreshPayload.uuid,
      });
      expect(result).toEqual(loginResDto);
    });
  });

  describe('OAuthLoginByEmail', () => {
    it('should return whether user exists and login result', async () => {
      const email = 'test@test.com';
      const user = new User();
      user.email = email;
      const loginResDto: LoginResDto = {
        token: {
          access_token: 'access_token',
          refresh_token: 'refresh_token',
        },
        user,
      };
      const oAuthLoginResDto: OAuthLoginResDto = {
        is_exist: true,
        ...loginResDto,
      };
      userService.findByEmail.mockResolvedValue(user);
      service.login = jest.fn().mockResolvedValue(loginResDto);

      const result = await service.OAuthLoginByEmail(email);

      expect(userService.findByEmail).toHaveBeenCalledWith(email);
      expect(service.login).toHaveBeenCalledWith(user);
      expect(result).toEqual(oAuthLoginResDto);
    });

    it('should return whether user does not exist', async () => {
      const email = 'test@test.com';
      const expectedResponse = {
        is_exist: false,
      };
      userService.findByEmail.mockResolvedValue(undefined);

      const result = await service.OAuthLoginByEmail(email);

      expect(userService.findByEmail).toHaveBeenCalledWith(email);
      expect(result).toEqual(expectedResponse);
    });
  });
});
