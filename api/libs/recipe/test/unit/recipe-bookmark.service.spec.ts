import { TestBed } from '@automock/jest';
import { RecipeBookmarkRepository } from '@app/recipe/repositories/recipe-bookmark/recipe-bookmark.repository';
import { RecipeBookmarkService } from '@app/recipe/services/recipe-bookmark.service';
import { FilterRecipeBookmarkDto } from '@app/recipe/dto/recipe-bookmark/filter-recipe-bookmark.dto';
import { RecipeBookmarksItemDto } from '@app/recipe/dto/recipe-bookmark/recipe-bookmarks-item.dto';
import { RecipeBookmarksResponseDto } from '@app/recipe/dto/recipe-bookmark/recipe-bookmarks-response.dto';
import { RecipeBookmarksAndCountDto } from '@app/recipe/dto/recipe-bookmark/recipe-bookmarks-count.dto';
import { RecipeRepository } from '@app/recipe/repositories/recipe/recipe.repository';
import { UserRepository } from '@app/user/repositories/user.repository';
import { RecipeEntity } from '@app/recipe/domain/recipe.entity';
import { UserEntity } from '@app/user/domain/user.entity';
import { RecipeBookmarkEntity } from '@app/recipe/domain/recipe-bookmark.entity';
import { RecipeBookmarkDuplicateException } from '@app/recipe/exception/domain.exception';
import { Diet } from '@prisma/client';

describe('RecipeBookmarkService', () => {
  let service: RecipeBookmarkService;
  let recipeBookmarkRepository: jest.Mocked<RecipeBookmarkRepository>;
  let recipeRepository: jest.Mocked<RecipeRepository>;
  let userRepository: jest.Mocked<UserRepository>;

  const recipeEntity: RecipeEntity = {
    id: 1,
    name: 'recipe',
    mongoId: 'mongoId',
    ownerId: 1,
    description: 'description',
    thumbnail: 'thumbnail',
    viewCount: 0,
    originUrl: 'originUrl',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const userEntity: UserEntity = {
    id: 1,
    email: 'email',
    username: 'name',
    introduction: 'introduction',
    diet: Diet.NORMAL,
    thumbnail: 'thumbnail',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const recipeBookmarkEntity: RecipeBookmarkEntity = {
    id: 1,
    recipeId: 1,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const filterRecipeBookmarkDto: FilterRecipeBookmarkDto = {
    page: 1,
    limit: 2,
  };
  const recipeBookmarksAndCountLast: jest.Mocked<RecipeBookmarksAndCountDto> = {
    recipes: [new RecipeBookmarksItemDto(), new RecipeBookmarksItemDto()],
    count: 2,
    toRecipeBookmarksResponseDto: jest.fn(),
  };
  const recipeBookmarksAndCountNotLast: jest.Mocked<RecipeBookmarksAndCountDto> =
    {
      recipes: [new RecipeBookmarksItemDto(), new RecipeBookmarksItemDto()],
      count: 15,
      toRecipeBookmarksResponseDto: jest.fn(),
    };
  const recipeBookmarksResponseDtoLast: RecipeBookmarksResponseDto = {
    results: recipeBookmarksAndCountLast.recipes,
    page: 1,
    count: 2,
    hasNext: true,
  };
  const recipeBookmarksResponseDtoNotLast: RecipeBookmarksResponseDto = {
    results: recipeBookmarksAndCountNotLast.recipes,
    page: 1,
    count: 2,
    hasNext: false,
  };

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
