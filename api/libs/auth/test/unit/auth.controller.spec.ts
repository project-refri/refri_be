import {
  HttpStatus,
  INestApplication,
  NotFoundException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthController } from '@app/auth/auth.controller';
import { AuthService } from '@app/auth/auth.service';
import request from 'supertest';
import { instanceToPlain } from 'class-transformer';
import { MockedAuthService } from '../fixture/mocked-provider';
import { globalInhancers } from '@app/common/global-inhancers';
import {
  googleLoginDto,
  kakaoLoginDto,
  loginSessionDto,
  oAuthLoginSessionDto,
  sessionEntity,
  userInfo,
} from '../fixture/auth.fixture';
import {
  createUserApiDto,
  userDto,
} from '../../../user/test/fixture/user.fixture';

describe('AuthController', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [MockedAuthService, ...globalInhancers],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
    authService = moduleRef.get(AuthService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('/auth/me (GET)', () => {
    it('should return login User dto', async () => {
      jest
        .spyOn(authService, 'findBySessionToken')
        .mockResolvedValue(sessionEntity);

      const res = (
        await request(app.getHttpServer())
          .get('/auth/me')
          .set('Authorization', 'Bearer token')
          .expect(HttpStatus.OK)
      ).body;

      expect(res.success).toBe(true);
      expect(res.data).toEqual(instanceToPlain(userDto));
    });

    it('should return 401 if session not found', async () => {
      jest
        .spyOn(authService, 'findBySessionToken')
        .mockRejectedValue(NotFoundException);

      const res = (
        await request(app.getHttpServer())
          .get('/auth/me')
          .set('Authorization', 'Bearer token')
          .expect(HttpStatus.UNAUTHORIZED)
      ).body;

      expect(res.success).toBe(false);
      expect(res.error).toEqual(
        expect.objectContaining({
          name: 'UnauthorizedException',
          message: 'Unauthorized',
        }),
      );
    });
  });

  describe('/auth/register (POST)', () => {
    it('should return login response', async () => {
      jest
        .spyOn(authService, 'verifyRegisterToken')
        .mockResolvedValue(userInfo);
      jest.spyOn(authService, 'register').mockResolvedValue(loginSessionDto);

      const res = (
        await request(app.getHttpServer())
          .post('/auth/register')
          .set('Authorization', 'Bearer token')
          .send(createUserApiDto)
          .expect(HttpStatus.OK)
      ).body;

      expect(res.success).toBe(true);
      expect(res.data).toEqual(instanceToPlain(loginSessionDto));
    });

    it('should return 401 if register token is invalid', async () => {
      jest.spyOn(authService, 'verifyRegisterToken').mockRejectedValue(Error);

      const res = (
        await request(app.getHttpServer())
          .post('/auth/register')
          .set('Authorization', 'Bearer token')
          .send(createUserApiDto)
          .expect(HttpStatus.UNAUTHORIZED)
      ).body;

      expect(res.success).toBe(false);
      expect(res.error).toEqual(
        expect.objectContaining({
          name: 'UnauthorizedException',
          message: 'Unauthorized',
        }),
      );
    });
  });

  describe('/auth/google (POST)', () => {
    it('should return login response', async () => {
      jest
        .spyOn(authService, 'googleLogin')
        .mockResolvedValue(oAuthLoginSessionDto);

      const res = (
        await request(app.getHttpServer())
          .post('/auth/google')
          .send(instanceToPlain(googleLoginDto))
          .expect(HttpStatus.OK)
      ).body;

      expect(res.success).toBe(true);
      expect(res.data).toEqual(instanceToPlain(oAuthLoginSessionDto));
    });
  });

  describe('/auth/kakao (POST)', () => {
    it('should return login response', async () => {
      jest
        .spyOn(authService, 'kakaoLogin')
        .mockResolvedValue(oAuthLoginSessionDto);

      const res = (
        await request(app.getHttpServer())
          .post('/auth/kakao')
          .send(instanceToPlain(kakaoLoginDto))
          .expect(HttpStatus.OK)
      ).body;

      expect(res.success).toBe(true);
      expect(res.data).toEqual(instanceToPlain(oAuthLoginSessionDto));
    });
  });

  describe('/auth/logout (POST)', () => {
    it('should return logout response', async () => {
      jest
        .spyOn(authService, 'findBySessionToken')
        .mockResolvedValue(sessionEntity);
      jest.spyOn(authService, 'logout').mockResolvedValue(undefined);

      const res = (
        await request(app.getHttpServer())
          .post('/auth/logout')
          .set('Authorization', 'Bearer token')
          .expect(HttpStatus.OK)
      ).body;

      expect(res.success).toBe(true);
    });
  });
});
