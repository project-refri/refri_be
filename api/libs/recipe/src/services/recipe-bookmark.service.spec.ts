import { TestBed } from '@automock/jest';
import { RecipeBookmarkRepository } from '../repositories/recipe-bookmark.repository';
import { RecipeBookmarkService } from './recipe-bookmark.service';
import {
  FilterRecipeBookmarkDto,
  RecipeBookmarkListViewResponseDto,
  RecipeBookmarksAndCountDto,
  RecipeBookmarksResponseDto,
} from '../dto/filter-recipe-bookmark.dto';

describe('RecipeBookmarkService', () => {
  let service: RecipeBookmarkService;
  let recipeBookmarkRepository: jest.Mocked<RecipeBookmarkRepository>;

  const filterRecipeBookmarkDto: FilterRecipeBookmarkDto = {
    page: 1,
    limit: 2,
  };
  const recipeBookmarksAndCountLast: jest.Mocked<RecipeBookmarksAndCountDto> = {
    recipes: [
      new RecipeBookmarkListViewResponseDto(),
      new RecipeBookmarkListViewResponseDto(),
    ],
    count: 2,
    toRecipeBookmarksResponseDto: jest.fn(),
  };
  const recipeBookmarksAndCountNotLast: jest.Mocked<RecipeBookmarksAndCountDto> =
    {
      recipes: [
        new RecipeBookmarkListViewResponseDto(),
        new RecipeBookmarkListViewResponseDto(),
      ],
      count: 15,
      toRecipeBookmarksResponseDto: jest.fn(),
    };
  const recipeBookmarksResponseDtoLast: RecipeBookmarksResponseDto = {
    results: recipeBookmarksAndCountLast.recipes,
    page: 1,
    count: 2,
    has_next: true,
  };
  const recipeBookmarksResponseDtoNotLast: RecipeBookmarksResponseDto = {
    results: recipeBookmarksAndCountNotLast.recipes,
    page: 1,
    count: 2,
    has_next: false,
  };

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(RecipeBookmarkService).compile();

    service = unit;
    recipeBookmarkRepository = unitRef.get(RecipeBookmarkRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
});
