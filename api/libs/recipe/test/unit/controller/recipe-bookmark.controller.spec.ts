import { RecipeBookmarkController } from '@app/recipe/controllers/recipe-bookmark.controller';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { RecipeBookmarkService } from '@app/recipe/services/recipe-bookmark.service';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { instanceToPlain } from 'class-transformer';
import { AuthService } from '@app/auth/auth.service';
import { MockedRecipeBookmarkService } from '../../fixture/mocked-provider';
import { MockedAuthService } from '../../../../auth/test/fixture/mocked-provider';
import { globalInhancers } from '@app/common/global-inhancers';
import {
  createRecipeBookmarkDto,
  filterRecipeBookmarkDto,
  recipeBookmarkDto,
  recipeBookmarkEntity,
  recipeBookmarksResponseDto,
} from '../../fixture/recipe-bookmark.fixture';
import { sessionEntity } from '../../../../auth/test/fixture/auth.fixture';

describe('RecipeBookmarkController', () => {
  let app: INestApplication;
  let recipeBookmarkService: RecipeBookmarkService;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [RecipeBookmarkController],
      providers: [
        MockedRecipeBookmarkService,
        MockedAuthService,
        ...globalInhancers,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    recipeBookmarkService = moduleRef.get<RecipeBookmarkService>(
      RecipeBookmarkService,
    );
    authService = moduleRef.get<AuthService>(AuthService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(authService, 'findBySessionToken')
      .mockResolvedValue(sessionEntity);
  });

  describe('/recipe-bookmark (POST)', () => {
    it('should return 201 and created RecipeBookmark', async () => {
      jest
        .spyOn(recipeBookmarkService, 'create')
        .mockResolvedValue(recipeBookmarkEntity);

      const res = (
        await request(app.getHttpServer())
          .post('/recipe-bookmark')
          .set('Authorization', 'Bearer token')
          .send(instanceToPlain(createRecipeBookmarkDto))
          .expect(HttpStatus.CREATED)
      ).body;

      expect(res.success).toBe(true);
      expect(res.data).toEqual(instanceToPlain(recipeBookmarkDto));
    });

    it('should return 400 if dto is invalid', async () => {
      const res = (
        await request(app.getHttpServer())
          .post('/recipe-bookmark')
          .set('Authorization', 'Bearer token')
          .send(instanceToPlain({ ...createRecipeBookmarkDto, recipeId: null }))
          .expect(HttpStatus.BAD_REQUEST)
      ).body;

      expect(res.success).toBe(false);
      expect(res.error).toEqual(
        expect.objectContaining({
          name: 'BadRequestException',
        }),
      );
    });

    it('should return 401 if session is invalid', async () => {
      jest.spyOn(authService, 'findBySessionToken').mockResolvedValue(null);

      const res = (
        await request(app.getHttpServer())
          .post('/recipe-bookmark')
          .set('Authorization', 'Bearer token')
          .send(instanceToPlain(createRecipeBookmarkDto))
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

  describe('/recipe-bookmark (GET)', () => {
    it('should return 200 and RecipeBookmarks', async () => {
      jest
        .spyOn(recipeBookmarkService, 'findAllRecipeBookmarked')
        .mockResolvedValue(recipeBookmarksResponseDto);

      const res = (
        await request(app.getHttpServer())
          .get('/recipe-bookmark')
          .query(filterRecipeBookmarkDto)
          .set('Authorization', 'Bearer token')
          .expect(HttpStatus.OK)
      ).body;

      expect(res.success).toBe(true);
      expect(res.data).toEqual(instanceToPlain(recipeBookmarksResponseDto));
    });

    it('should return 400 if dto is invalid', async () => {
      const res = (
        await request(app.getHttpServer())
          .get('/recipe-bookmark')
          .query({
            ...filterRecipeBookmarkDto,
            page: 'invalid-page',
          })
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

    it('should return 401 if session is invalid', async () => {
      jest.spyOn(authService, 'findBySessionToken').mockResolvedValue(null);

      const res = (
        await request(app.getHttpServer())
          .get('/recipe-bookmark')
          .query(filterRecipeBookmarkDto)
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

  describe('/recipe-bookmark/:id (DELETE)', () => {
    it('should return 204 and deleted RecipeBookmark', async () => {
      jest
        .spyOn(recipeBookmarkService, 'deleteOne')
        .mockResolvedValue(recipeBookmarkEntity);

      const res = (
        await request(app.getHttpServer())
          .delete('/recipe-bookmark/1')
          .set('Authorization', 'Bearer token')
          .expect(HttpStatus.NO_CONTENT)
      ).body;
    });

    it('should return 400 if id is invalid', async () => {
      const res = (
        await request(app.getHttpServer())
          .delete('/recipe-bookmark/invalid-id')
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

    it('should return 401 if session is invalid', async () => {
      jest.spyOn(authService, 'findBySessionToken').mockResolvedValue(null);

      const res = (
        await request(app.getHttpServer())
          .delete('/recipe-bookmark/1')
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
