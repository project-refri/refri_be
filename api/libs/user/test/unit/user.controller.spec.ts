import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '@app/user/user.controller';
import { MockedUserService } from '../fixture/mocked-provider';
import { globalInhancers } from '@app/common/global-inhancers';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import {
  createUserDto,
  updateUserDto,
  userDto,
  userEntity,
} from '../fixture/user.fixture';
import request from 'supertest';
import { instanceToPlain } from 'class-transformer';
import { AuthService } from '@app/auth/auth.service';
import { MockedAuthService } from '../../../auth/test/fixture/mocked-provider';
import { sessionEntity } from '../../../auth/test/fixture/auth.fixture';

describe('UserController', () => {
  let app: INestApplication;
  let userService: UserService;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [MockedUserService, MockedAuthService, ...globalInhancers],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    userService = moduleRef.get<UserService>(UserService);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(authService, 'findBySessionToken')
      .mockResolvedValue(sessionEntity);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/user (POST)', () => {
    it('should return HttpStatus.CREATED and the created user', async () => {
      jest.spyOn(userService, 'create').mockResolvedValue(userEntity);

      const res = (
        await request(app.getHttpServer())
          .post('/user')
          .set('Authorization', 'Bearer token')
          .send(createUserDto)
          .expect(HttpStatus.CREATED)
      ).body;

      expect(res.success).toBe(true);
      expect(res.data).toEqual(instanceToPlain(userDto));
    });

    it('should return HttpStatus.BAD_REQUEST if dto is not valid', async () => {
      const res = (
        await request(app.getHttpServer())
          .post('/user')
          .set('Authorization', 'Bearer token')
          .send({
            ...createUserDto,
            email: 'invalid-email',
          })
          .expect(HttpStatus.BAD_REQUEST)
      ).body;

      expect(res.success).toBe(false);
      expect(res.error).toEqual(
        expect.objectContaining({
          name: 'BadRequestException',
        }),
      );
    });

    it('should return HttpStatus.UNAUTHORIZED if session is not valid', async () => {
      jest.spyOn(authService, 'findBySessionToken').mockResolvedValue(null);

      const res = (
        await request(app.getHttpServer())
          .post('/user')
          .set('Authorization', 'Bearer token')
          .send(createUserDto)
          .expect(HttpStatus.UNAUTHORIZED)
      ).body;

      expect(res.success).toBe(false);
      expect(res.error).toEqual(
        expect.objectContaining({
          name: 'UnauthorizedException',
        }),
      );
    });
  });

  describe('/user (GET)', () => {
    it('should return HttpStatus.OK and the users', async () => {
      jest.spyOn(userService, 'findAll').mockResolvedValue([userEntity]);

      const res = (
        await request(app.getHttpServer())
          .get('/user')
          .set('Authorization', 'Bearer token')
          .expect(HttpStatus.OK)
      ).body;

      expect(res.success).toBe(true);
      expect(res.data).toEqual([instanceToPlain(userDto)]);
    });

    it('should return HttpStatus.UNAUTHORIZED if session is not valid', async () => {
      jest.spyOn(authService, 'findBySessionToken').mockResolvedValue(null);

      const res = (
        await request(app.getHttpServer())
          .get('/user')
          .set('Authorization', 'Bearer token')
          .expect(HttpStatus.UNAUTHORIZED)
      ).body;

      expect(res.success).toBe(false);
      expect(res.error).toEqual(
        expect.objectContaining({
          name: 'UnauthorizedException',
        }),
      );
    });
  });

  describe('/user/:id (GET)', () => {
    it('should return HttpStatus.OK and the user', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(userEntity);

      const res = (
        await request(app.getHttpServer())
          .get('/user/1')
          .set('Authorization', 'Bearer token')
          .expect(HttpStatus.OK)
      ).body;

      expect(res.success).toBe(true);
      expect(res.data).toEqual(instanceToPlain(userDto));
    });

    it('should return HttpStatus.BAD_REQUEST if id is not valid', async () => {
      const res = (
        await request(app.getHttpServer())
          .get('/user/invalid-id')
          .set('Authorization', 'Bearer token')
          .expect(HttpStatus.BAD_REQUEST)
      ).body;

      expect(res.success).toBe(false);
      expect(res.error).toEqual(
        expect.objectContaining({
          name: 'BadRequestException',
        }),
      );
    });

    it('should return HttpStatus.UNAUTHORIZED if session is not valid', async () => {
      jest.spyOn(authService, 'findBySessionToken').mockResolvedValue(null);

      const res = (
        await request(app.getHttpServer())
          .get('/user/1')
          .set('Authorization', 'Bearer token')
          .expect(HttpStatus.UNAUTHORIZED)
      ).body;

      expect(res.success).toBe(false);
      expect(res.error).toEqual(
        expect.objectContaining({
          name: 'UnauthorizedException',
        }),
      );
    });
  });

  describe('/user/:id (PATCH)', () => {
    it('should return HttpStatus.OK and the updated user', async () => {
      jest.spyOn(userService, 'update').mockResolvedValue(userEntity);

      const res = (
        await request(app.getHttpServer())
          .patch('/user/1')
          .set('Authorization', 'Bearer token')
          .send(updateUserDto)
          .expect(HttpStatus.OK)
      ).body;

      expect(res.success).toBe(true);
      expect(res.data).toEqual(instanceToPlain(userDto));
    });

    it('should return HttpStatus.BAD_REQUEST if id is not valid', async () => {
      const res = (
        await request(app.getHttpServer())
          .patch('/user/invalid-id')
          .set('Authorization', 'Bearer token')
          .send(updateUserDto)
          .expect(HttpStatus.BAD_REQUEST)
      ).body;

      expect(res.success).toBe(false);
      expect(res.error).toEqual(
        expect.objectContaining({
          name: 'BadRequestException',
        }),
      );
    });

    it('should return HttpStatus.BAD_REQUEST if dto is not valid', async () => {
      const res = (
        await request(app.getHttpServer())
          .patch('/user/1')
          .set('Authorization', 'Bearer token')
          .send({
            ...updateUserDto,
            thumbnail: 'invalid-thumbnail',
          })
          .expect(HttpStatus.BAD_REQUEST)
      ).body;

      expect(res.success).toBe(false);
      expect(res.error).toEqual(
        expect.objectContaining({
          name: 'BadRequestException',
        }),
      );
    });

    it('should return HttpStatus.UNAUTHORIZED if session is not valid', async () => {
      jest.spyOn(authService, 'findBySessionToken').mockResolvedValue(null);

      const res = (
        await request(app.getHttpServer())
          .patch('/user/1')
          .set('Authorization', 'Bearer token')
          .send(updateUserDto)
          .expect(HttpStatus.UNAUTHORIZED)
      ).body;

      expect(res.success).toBe(false);
      expect(res.error).toEqual(
        expect.objectContaining({
          name: 'UnauthorizedException',
        }),
      );
    });
  });

  describe('/user/:id (DELETE)', () => {
    it('should return HttpStatus.NO_CONTENT and the deleted user', async () => {
      jest.spyOn(userService, 'deleteOne').mockResolvedValue(userEntity);

      const res = (
        await request(app.getHttpServer())
          .delete('/user/1')
          .set('Authorization', 'Bearer token')
          .expect(HttpStatus.NO_CONTENT)
      ).body;
    });

    it('should return HttpStatus.BAD_REQUEST if id is not valid', async () => {
      const res = (
        await request(app.getHttpServer())
          .delete('/user/invalid-id')
          .set('Authorization', 'Bearer token')
          .expect(HttpStatus.BAD_REQUEST)
      ).body;

      expect(res.success).toBe(false);
      expect(res.error).toEqual(
        expect.objectContaining({
          name: 'BadRequestException',
        }),
      );
    });

    it('should return HttpStatus.UNAUTHORIZED if session is not valid', async () => {
      jest.spyOn(authService, 'findBySessionToken').mockResolvedValue(null);

      const res = (
        await request(app.getHttpServer())
          .delete('/user/1')
          .set('Authorization', 'Bearer token')
          .expect(HttpStatus.UNAUTHORIZED)
      ).body;

      expect(res.success).toBe(false);
      expect(res.error).toEqual(
        expect.objectContaining({
          name: 'UnauthorizedException',
        }),
      );
    });
  });
});
