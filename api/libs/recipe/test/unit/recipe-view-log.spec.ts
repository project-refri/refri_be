import { CreateRecipeViewLogDto } from '@app/recipe/dto/recipe-view-log/create-recipe-view-log.dto';
import { RecipeEntity } from '@app/recipe/domain/recipe.entity';
import { UserEntity } from '@app/user/domain/user.entity';
import { RecipeViewLog } from '@app/recipe/domain/recipe-view-log.entity';
import {
  RecipeNotExistsException,
  UserNotExistsException,
} from '@app/recipe/exception/domain.exception';

describe('RecipeViewLog', () => {
  describe('create', () => {
    const createRecipeViewLogDto: CreateRecipeViewLogDto = {
      recipeId: 1,
      userId: 1,
      userIp: ':::1',
    };
    const recipeEntity: RecipeEntity = {
      id: 1,
      mongoId: null,
      name: 'recipe-name',
      description: 'recipe-description',
      ownerId: 1,
      owner: null,
      thumbnail: 'recipe-thumbnail',
      originUrl: 'recipe-origin-url',
      viewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const userEntity: UserEntity = {
      id: 1,
      email: 'user-email',
      username: 'user-name',
      introduction: 'user-introduction',
      diet: 'NORMAL',
      thumbnail: 'user-thumbnail',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const datetime = new Date();

    it('create instance with valid data', () => {
      const recipeViewLog = RecipeViewLog.create(
        createRecipeViewLogDto,
        recipeEntity,
        userEntity,
        datetime,
      );

      expect(recipeViewLog).toBeDefined();
    });

    it('should not create if recipe is not exists', () => {
      const recipeEntity: RecipeEntity = null;

      expect(() =>
        RecipeViewLog.create(
          createRecipeViewLogDto,
          recipeEntity,
          userEntity,
          datetime,
        ),
      ).toThrow(RecipeNotExistsException);
    });

    it('should not create if either user or userIp is not exists', () => {
      const userEntity: UserEntity = null;
      const createRecipeViewLogDto: CreateRecipeViewLogDto = {
        recipeId: 1,
        userId: null,
        userIp: null,
      };

      expect(() =>
        RecipeViewLog.create(
          createRecipeViewLogDto,
          recipeEntity,
          userEntity,
          datetime,
        ),
      ).toThrow(UserNotExistsException);
    });
  });
});
