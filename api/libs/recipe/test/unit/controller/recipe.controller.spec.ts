import { RecipeController } from '@app/recipe/controllers/recipe.controller';
import {
  HttpStatus,
  INestApplication,
  UnauthorizedException,
} from '@nestjs/common';
import { RecipeService } from '@app/recipe/services/recipe.service';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { SessionAuthGuard } from '@app/auth/guards/session-auth.guard';
import { instanceToPlain } from 'class-transformer';
import { MockedRecipeService } from '../../fixture/mocked-provider';
import { globalInhancers } from '@app/common/global-inhancers';
import {
  createRecipeDto,
  filterRecipeDto,
  recipeDetailDto,
  recipeDto,
  recipeEntity,
  recipesItemDto,
  recipesResponseDto,
  updateRecipeDto,
} from '../../fixture/recipe.fixture';

describe('RecipeController', () => {
  let app: INestApplication;
  let recipeService: RecipeService;
  let authGuard: SessionAuthGuard;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [RecipeController],
      providers: [MockedRecipeService, ...globalInhancers],
    })
      .overrideGuard(SessionAuthGuard)
      .useValue({
        canActivate: jest.fn().mockReturnValue(true),
      })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();

    recipeService = moduleRef.get(RecipeService);
    authGuard = moduleRef.get(SessionAuthGuard);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(authGuard, 'canActivate').mockResolvedValue(true);
  });

  describe('/recipe (POST)', () => {
    it('should return 201 and created recipe', async () => {
      jest.spyOn(recipeService, 'create').mockResolvedValue(recipeEntity);

      const res = (
        await request(app.getHttpServer())
          .post('/recipe')
          .send(instanceToPlain(createRecipeDto))
          .expect(HttpStatus.CREATED)
      ).body;

      expect(res.success).toBe(true);
      expect(res.data).toEqual(instanceToPlain(recipeDto));
    });

    it('should return 400 if dto is invalid', async () => {
      const res = (
        await request(app.getHttpServer())
          .post('/recipe')
          .send(
            instanceToPlain({
              ...createRecipeDto,
              name: 1,
            }),
          )
          .expect(HttpStatus.BAD_REQUEST)
      ).body;

      expect(res.success).toBe(false);
      expect(res.error).toEqual(
        expect.objectContaining({
          name: 'BadRequestException',
        }),
      );
    });

    it('should return 401 if session not found', async () => {
      jest.spyOn(authGuard, 'canActivate').mockImplementation(() => {
        throw new UnauthorizedException();
      });

      const res = (
        await request(app.getHttpServer())
          .post('/recipe')
          .send(instanceToPlain(createRecipeDto))
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

  describe('/recipe (GET)', () => {
    it('should return 200 and recipes with pagination', async () => {
      jest
        .spyOn(recipeService, 'findAll')
        .mockResolvedValue(recipesResponseDto);

      const res = (
        await request(app.getHttpServer())
          .get('/recipe')
          .query(filterRecipeDto)
          .expect(HttpStatus.OK)
      ).body;

      expect(res.success).toBe(true);
      expect(res.data).toEqual(instanceToPlain(recipesResponseDto));
    });

    it('should return 400 if query is invalid', async () => {
      const res = (
        await request(app.getHttpServer())
          .get('/recipe')
          .query({ page: 'test' })
          .expect(HttpStatus.BAD_REQUEST)
      ).body;

      expect(res.success).toBe(false);
      expect(res.error).toEqual(
        expect.objectContaining({
          name: 'BadRequestException',
        }),
      );
    });

    it('should return 401 if session not found', async () => {
      jest.spyOn(authGuard, 'canActivate').mockImplementation(() => {
        throw new UnauthorizedException();
      });

      const res = (
        await request(app.getHttpServer())
          .get('/recipe')
          .query(filterRecipeDto)
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

  describe('/recipe/search (GET)', () => {
    it('should return 200 and recipes with pagination', async () => {
      jest
        .spyOn(recipeService, 'findAllByFullTextSearch')
        .mockResolvedValue(recipesResponseDto);

      const res = (
        await request(app.getHttpServer())
          .get('/recipe/search')
          .query(filterRecipeDto)
          .expect(HttpStatus.OK)
      ).body;

      expect(res.success).toBe(true);
      expect(res.data).toEqual(instanceToPlain(recipesResponseDto));
    });

    it('should return 400 if query is invalid', async () => {
      const res = (
        await request(app.getHttpServer())
          .get('/recipe/search')
          .query({ searchQuery: '' })
          .expect(HttpStatus.BAD_REQUEST)
      ).body;

      expect(res.success).toBe(false);
      expect(res.error).toEqual(
        expect.objectContaining({
          name: 'BadRequestException',
        }),
      );
    });
  });

  describe('/recipe/top-viewed (GET)', () => {
    it('should return 200 and recipes with pagination', async () => {
      jest
        .spyOn(recipeService, 'findTopViewed')
        .mockResolvedValue([recipesItemDto]);

      const res = (
        await request(app.getHttpServer())
          .get('/recipe/top-viewed')
          .expect(HttpStatus.OK)
      ).body;

      expect(res.success).toBe(true);
      expect(res.data).toEqual([instanceToPlain(recipesItemDto)]);
    });
  });

  describe('/recipe/recent-viewed (GET)', () => {
    it('should return 200 and recipes with pagination', async () => {
      jest
        .spyOn(recipeService, 'findAllRecentViewed')
        .mockResolvedValue(recipesResponseDto);

      const res = (
        await request(app.getHttpServer())
          .get('/recipe/recent-viewed')
          .query(filterRecipeDto)
          .expect(HttpStatus.OK)
      ).body;

      expect(res.success).toBe(true);
      expect(res.data).toEqual(instanceToPlain(recipesResponseDto));
    });

    it('should return 401 if session not found', async () => {
      jest.spyOn(authGuard, 'canActivate').mockImplementation(() => {
        throw new UnauthorizedException();
      });

      const res = (
        await request(app.getHttpServer())
          .get('/recipe/recent-viewed')
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

  describe('/recipe/:id (GET)', () => {
    it('should return 200 and recipe', async () => {
      jest.spyOn(recipeService, 'findOne').mockResolvedValue(recipeDetailDto);

      const res = (
        await request(app.getHttpServer())
          .get('/recipe/1')
          .expect(HttpStatus.OK)
      ).body;

      expect(res.success).toBe(true);
      expect(res.data).toEqual(instanceToPlain(recipeDetailDto));
    });
  });

  describe('/recipe/:id (PATCH)', () => {
    it('should return 200 and updated recipe', async () => {
      jest.spyOn(recipeService, 'update').mockResolvedValue(recipeEntity);

      const res = (
        await request(app.getHttpServer())
          .patch('/recipe/1')
          .send(instanceToPlain(updateRecipeDto))
          .expect(HttpStatus.OK)
      ).body;

      expect(res.success).toBe(true);
      expect(res.data).toEqual(instanceToPlain(recipeDto));
    });

    it('should return 400 if dto is invalid', async () => {
      const res = (
        await request(app.getHttpServer())
          .patch('/recipe/1')
          .send(
            instanceToPlain({
              ...updateRecipeDto,
              name: 1,
            }),
          )
          .expect(HttpStatus.BAD_REQUEST)
      ).body;

      expect(res.success).toBe(false);
      expect(res.error).toEqual(
        expect.objectContaining({
          name: 'BadRequestException',
        }),
      );
    });

    it('should return 401 if session not found', async () => {
      jest.spyOn(authGuard, 'canActivate').mockImplementation(() => {
        throw new UnauthorizedException();
      });

      const res = (
        await request(app.getHttpServer())
          .patch('/recipe/1')
          .send(instanceToPlain(updateRecipeDto))
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

  describe('/recipe/:id (DELETE)', () => {
    it('should return 200 and deleted recipe', async () => {
      jest.spyOn(recipeService, 'deleteOne').mockResolvedValue(recipeEntity);

      await request(app.getHttpServer())
        .delete('/recipe/1')
        .expect(HttpStatus.NO_CONTENT);
    });

    it('should return 400 if id is invalid', async () => {
      const res = (
        await request(app.getHttpServer())
          .delete('/recipe/test')
          .expect(HttpStatus.BAD_REQUEST)
      ).body;

      expect(res.success).toBe(false);
      expect(res.error).toEqual(
        expect.objectContaining({
          name: 'BadRequestException',
        }),
      );
    });

    it('should return 401 if session not found', async () => {
      jest.spyOn(authGuard, 'canActivate').mockImplementation(() => {
        throw new UnauthorizedException();
      });

      const res = (
        await request(app.getHttpServer())
          .delete('/recipe/1')
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
