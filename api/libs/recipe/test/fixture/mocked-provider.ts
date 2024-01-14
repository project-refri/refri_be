import { RecipeBookmarkService } from '@app/recipe/services/recipe-bookmark.service';
import { RecipeService } from '@app/recipe/services/recipe.service';

export const MockedRecipeBookmarkService = {
  provide: RecipeBookmarkService,
  useValue: {
    create: jest.fn(),
    findAllRecipeBookmarked: jest.fn(),
    deleteOne: jest.fn(),
  },
};

export const MockedRecipeService = {
  provide: RecipeService,
  useValue: {
    create: jest.fn(),
    findAll: jest.fn(),
    findAllByFullTextSearch: jest.fn(),
    findAllRecentViewed: jest.fn(),
    findOne: jest.fn(),
    findTopViewed: jest.fn(),
    viewRecipe: jest.fn(),
    setAllViewedRecipesInPast1Month: jest.fn(),
    update: jest.fn(),
    deleteOne: jest.fn(),
  },
};
