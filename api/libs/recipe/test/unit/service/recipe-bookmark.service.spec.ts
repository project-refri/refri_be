import { TestBed } from '@automock/jest';
import { RecipeBookmarkRepository } from '@app/recipe/repositories/recipe-bookmark/recipe-bookmark.repository';
import { RecipeBookmarkService } from '@app/recipe/services/recipe-bookmark.service';
import { RecipeRepository } from '@app/recipe/repositories/recipe/recipe.repository';
import { UserRepository } from '@app/user/repositories/user.repository';
import { RecipeBookmarkDuplicateException } from '@app/recipe/exception/domain.exception';
import { recipeEntity } from '../../fixture/recipe.fixture';
import { userEntity } from '../../../../user/test/fixture/user.fixture';
import {
  filterRecipeBookmarkDto,
  recipeBookmarkEntity,
  recipeBookmarksAndCountLast,
  recipeBookmarksAndCountNotLast,
  recipeBookmarksResponseDtoLast,
  recipeBookmarksResponseDtoNotLast,
} from '../../fixture/recipe-bookmark.fixture';

describe('RecipeBookmarkService', () => {
  let service: RecipeBookmarkService;
  let recipeBookmarkRepository: jest.Mocked<RecipeBookmarkRepository>;
  let recipeRepository: jest.Mocked<RecipeRepository>;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(RecipeBookmarkService).compile();

    service = unit;
    recipeBookmarkRepository = unitRef.get(RecipeBookmarkRepository);
    recipeRepository = unitRef.get<RecipeRepository>('PrismaRecipeRepository');
    userRepository = unitRef.get(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a recipeBookmark', async () => {
      recipeBookmarkRepository.findAllByCond.mockResolvedValue([]);
      recipeRepository.findOne.mockResolvedValue(recipeEntity);
      userRepository.findOne.mockResolvedValue(userEntity);
      recipeBookmarkRepository.create.mockResolvedValue(recipeBookmarkEntity);

      const result = await service.create({
        userId: 1,
        recipeId: 1,
      });

      expect(result).toBeDefined();
    });

    it('should not create if recipeBookmark already exists', async () => {
      recipeBookmarkRepository.findAllByCond.mockResolvedValue([
        recipeBookmarkEntity,
      ]);

      await expect(
        service.create({
          userId: 1,
          recipeId: 1,
        }),
      ).rejects.toThrow(RecipeBookmarkDuplicateException);
    });
  });

  describe('findAllRecipeBookmarked', () => {
    it('should return an array of recipeBookmarks with last elements', async () => {
      recipeBookmarkRepository.findAllRecipeBookmarked.mockResolvedValue(
        recipeBookmarksAndCountLast,
      );
      recipeBookmarksAndCountLast.toRecipeBookmarksResponseDto.mockReturnValue(
        recipeBookmarksResponseDtoLast,
      );

      const result = await service.findAllRecipeBookmarked(
        filterRecipeBookmarkDto,
      );

      expect(
        recipeBookmarkRepository.findAllRecipeBookmarked,
      ).toHaveBeenCalledWith(filterRecipeBookmarkDto);
      expect(
        recipeBookmarksAndCountLast.toRecipeBookmarksResponseDto,
      ).toHaveBeenCalledWith(
        filterRecipeBookmarkDto.page,
        filterRecipeBookmarkDto.limit,
      );
      expect(result).toEqual(recipeBookmarksResponseDtoLast);
    });

    it('should return an array of recipes with not finished', async () => {
      recipeBookmarkRepository.findAllRecipeBookmarked.mockResolvedValue(
        recipeBookmarksAndCountNotLast,
      );
      recipeBookmarksAndCountNotLast.toRecipeBookmarksResponseDto.mockReturnValue(
        recipeBookmarksResponseDtoNotLast,
      );

      const result = await service.findAllRecipeBookmarked(
        filterRecipeBookmarkDto,
      );

      expect(
        recipeBookmarkRepository.findAllRecipeBookmarked,
      ).toHaveBeenCalledWith(filterRecipeBookmarkDto);
      expect(
        recipeBookmarksAndCountNotLast.toRecipeBookmarksResponseDto,
      ).toHaveBeenCalledWith(
        filterRecipeBookmarkDto.page,
        filterRecipeBookmarkDto.limit,
      );
      expect(result).toEqual(recipeBookmarksResponseDtoNotLast);
    });
  });

  describe('deleteOne', () => {
    it('should delete a recipeBookmark', async () => {
      recipeBookmarkRepository.deleteOne.mockResolvedValue(
        recipeBookmarkEntity,
      );

      await service.deleteOne(1);

      expect(recipeBookmarkRepository.deleteOne).toHaveBeenCalledWith(1);
    });
  });
});
