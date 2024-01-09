import { CreateRecipeBookmarkDto } from '@app/recipe/dto/recipe-bookmark/create-recipe-bookmark.dto';
import { RecipeEntity } from '@app/recipe/domain/recipe.entity';
import { UserEntity } from '@app/user/domain/user.entity';
import { Diet } from '@prisma/client';
import { RecipeBookmark } from '@app/recipe/domain/recipe-bookmark.entity';
import {
  RecipeNotExistsException,
  UserNotExistsException,
} from '@app/recipe/exception/domain.exception';

describe('RecipeBookmark', () => {
  describe('create', () => {
    const createRecipeBookmarkDto: CreateRecipeBookmarkDto = {
      recipeId: 1,
      userId: 1,
    };
    const recipeEntity: RecipeEntity = new RecipeEntity({
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
    });
    const userEntity: UserEntity = new UserEntity({
      id: 1,
      email: 'user-email',
      username: 'user-name',
      introduction: 'user-introduction',
      diet: Diet.NORMAL,
      thumbnail: 'user-thumbnail',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const datetime = new Date();

    it('create instance with valid data', () => {
      const recipeBookmark = RecipeBookmark.create(
        createRecipeBookmarkDto,
        recipeEntity,
        userEntity,
        datetime,
      );

      expect(recipeBookmark).toBeDefined();
    });

    it('should not create if recipe is not exists', () => {
      const recipeEntity: RecipeEntity = null;

      expect(() =>
        RecipeBookmark.create(
          createRecipeBookmarkDto,
          recipeEntity,
          userEntity,
          datetime,
        ),
      ).toThrow(RecipeNotExistsException);
    });

    it('should not create if user is not exists', () => {
      const userEntity: UserEntity = null;

      expect(() =>
        RecipeBookmark.create(
          createRecipeBookmarkDto,
          recipeEntity,
          userEntity,
          datetime,
        ),
      ).toThrow(UserNotExistsException);
    });
  });
});
