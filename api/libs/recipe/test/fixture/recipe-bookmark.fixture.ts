import { CreateRecipeBookmarkDto } from '@app/recipe/dto/recipe-bookmark/create-recipe-bookmark.dto';
import { RecipeBookmarkEntity } from '@app/recipe/domain/recipe-bookmark.entity';
import { RecipeBookmarkDto } from '@app/recipe/dto/recipe-bookmark/recipe-bookmark.dto';
import { FilterRecipeBookmarkDto } from '@app/recipe/dto/recipe-bookmark/filter-recipe-bookmark.dto';
import { RecipeBookmarksAndCountDto } from '@app/recipe/dto/recipe-bookmark/recipe-bookmarks-count.dto';
import { RecipeBookmarksItemDto } from '@app/recipe/dto/recipe-bookmark/recipe-bookmarks-item.dto';
import { RecipeBookmarksResponseDto } from '@app/recipe/dto/recipe-bookmark/recipe-bookmarks-response.dto';
import { recipeEntity } from './recipe.fixture';

export const createRecipeBookmarkDto = new CreateRecipeBookmarkDto(1, 1);

export const recipeBookmarkEntity: RecipeBookmarkEntity = {
  id: 1,
  recipeId: 1,
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const recipeBookmarkDto = new RecipeBookmarkDto({
  id: recipeBookmarkEntity.id,
  recipeId: recipeBookmarkEntity.recipeId,
  userId: recipeBookmarkEntity.userId,
  createdAt: recipeBookmarkEntity.createdAt,
  updatedAt: recipeBookmarkEntity.updatedAt,
});

export const filterRecipeBookmarkDto: FilterRecipeBookmarkDto = {
  page: 1,
  limit: 2,
};

export const recipeBookmarksItemDto: RecipeBookmarksItemDto =
  new RecipeBookmarksItemDto({
    id: recipeBookmarkEntity.id,
    name: recipeEntity.name,
    thumbnail: recipeEntity.thumbnail,
    description: recipeEntity.description,
    viewCount: recipeEntity.viewCount,
    recipeBookmarkId: 1,
    createdAt: recipeBookmarkEntity.createdAt,
    updatedAt: recipeBookmarkEntity.updatedAt,
  });

export const recipeBookmarksResponseDto: RecipeBookmarksResponseDto =
  new RecipeBookmarksResponseDto([recipeBookmarksItemDto], 1, 1, true);

export const recipeBookmarksAndCountLast: jest.Mocked<RecipeBookmarksAndCountDto> =
  {
    recipes: [recipeBookmarksItemDto, recipeBookmarksItemDto],
    count: 2,
    toRecipeBookmarksResponseDto: jest.fn(),
  };

export const recipeBookmarksAndCountNotLast: jest.Mocked<RecipeBookmarksAndCountDto> =
  {
    recipes: [recipeBookmarksItemDto, recipeBookmarksItemDto],
    count: 15,
    toRecipeBookmarksResponseDto: jest.fn(),
  };

export const recipeBookmarksResponseDtoLast: RecipeBookmarksResponseDto = {
  results: recipeBookmarksAndCountLast.recipes,
  page: 1,
  count: 2,
  hasNext: true,
};

export const recipeBookmarksResponseDtoNotLast: RecipeBookmarksResponseDto = {
  results: recipeBookmarksAndCountNotLast.recipes,
  page: 1,
  count: 2,
  hasNext: false,
};
