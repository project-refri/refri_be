import { CreateMongoRecipeDto } from '@app/recipe/dto/recipe/create-mongo-recipe.dto';
import { RecipeEntity } from '@app/recipe/domain/recipe.entity';
import { FilterRecipeDto } from '@app/recipe/dto/recipe/filter-recipe.dto';
import { RecipesItemDto } from '@app/recipe/dto/recipe/recipes-item.dto';
import { RecipesResponseDto } from '@app/recipe/dto/recipe/recipes-response.dto';
import { RecipeDetailDto } from '@app/recipe/dto/recipe/recipe-detail.dto';
import { UpdateRecipeDto } from '@app/recipe/dto/recipe/update-recipe.dto';
import { RecipeDto } from '@app/recipe/dto/recipe/recipe.dto';
import { TextSearchRecipeDto } from '@app/recipe/dto/recipe/text-search.dto';
import { RecipesAndCountDto } from '@app/recipe/dto/recipe/recipes-count.dto';

export const createRecipeDto = new CreateMongoRecipeDto();
createRecipeDto.name = 'test';
createRecipeDto.description = 'test';
createRecipeDto.ingredientRequirements = [
  {
    name: 'test',
    amount: 'test',
  },
];
createRecipeDto.recipeSteps = [
  {
    description: 'test',
    ingredients: [
      {
        name: 'test',
        amount: 'test',
      },
    ],
    images: ['https://image.url'],
  },
];
createRecipeDto.thumbnail = 'https://image.url';
createRecipeDto.recipeRawText = 'test';
createRecipeDto.originUrl = 'https://image.url';

export const recipeEntity: RecipeEntity = {
  id: 1,
  name: 'test',
  mongoId: 'test_id',
  ownerId: 1,
  description: 'test',
  thumbnail: 'test',
  viewCount: 0,
  originUrl: 'test',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const recipeDto: RecipeDto = new RecipeDto({
  id: recipeEntity.id,
  name: recipeEntity.name,
  mongoId: recipeEntity.mongoId,
  ownerId: recipeEntity.ownerId,
  description: recipeEntity.description,
  thumbnail: recipeEntity.thumbnail,
  viewCount: recipeEntity.viewCount,
  originUrl: recipeEntity.originUrl,
  createdAt: recipeEntity.createdAt,
  updatedAt: recipeEntity.updatedAt,
});

export const filterRecipeDto: FilterRecipeDto = new FilterRecipeDto(1, 1);

export const recipesItemDto = new RecipesItemDto(
  1,
  'test',
  'https://image.url',
  'test',
  0,
  new Date(),
  new Date(),
);

export const recipesResponseDto = new RecipesResponseDto(
  [recipesItemDto],
  1,
  1,
  true,
);

export const recipeDetailDto: RecipeDetailDto = new RecipeDetailDto({
  id: recipeEntity.id,
  name: recipeEntity.name,
  mongoId: recipeEntity.mongoId,
  description: recipeEntity.description,
  thumbnail: recipeEntity.thumbnail,
  ownerId: recipeEntity.ownerId,
  ingredientRequirements: createRecipeDto.ingredientRequirements,
  recipeSteps: createRecipeDto.recipeSteps,
  viewCount: recipeEntity.viewCount,
  createdAt: recipeEntity.createdAt,
  updatedAt: recipeEntity.updatedAt,
});

export const updateRecipeDto: UpdateRecipeDto = {
  name: 'test',
  description: 'test',
};

export const textSearchRecipeDto: TextSearchRecipeDto = {
  searchQuery: 'test',
  page: 1,
  limit: 10,
};

export const recipesAndCountLast: jest.Mocked<RecipesAndCountDto> = {
  recipes: [recipesItemDto, recipesItemDto],
  count: 2,
  toRecipesResponseDto: jest.fn(),
};

export const recipesAndCountNotLast: jest.Mocked<RecipesAndCountDto> = {
  recipes: [recipesItemDto, recipesItemDto],
  count: 15,
  toRecipesResponseDto: jest.fn(),
};
export const recipesResponseDtoLast: RecipesResponseDto = {
  results: recipesAndCountLast.recipes,
  page: 1,
  count: 2,
  hasNext: true,
};
export const recipesResponseDtoNotLast: RecipesResponseDto = {
  results: recipesAndCountNotLast.recipes,
  page: 1,
  count: 2,
  hasNext: false,
};
