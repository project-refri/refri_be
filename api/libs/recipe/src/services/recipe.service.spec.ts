import { CreateRecipeDto } from '../dto/modify-recipe.dto';
import { Recipe } from '../entities/recipe.entity';
import { RecipeRepository } from '../repositories/recipe.repository';
import { RecipeService } from './recipe.service';
import { TestBed } from '@automock/jest';

describe('RecipeService', () => {
  let service: RecipeService;
  let recipeRepository: jest.Mocked<RecipeRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(RecipeService).compile();

    service = unit;
    recipeRepository = unitRef.get(RecipeRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new recipe', async () => {
      const createRecipeDto = {} as CreateRecipeDto;
      const recipe = new Recipe();
      recipeRepository.create.mockResolvedValue(recipe);

      const result = await service.create(createRecipeDto);

      expect(recipeRepository.create).toHaveBeenCalledWith(createRecipeDto);
      expect(result).toEqual(recipe);
    });
  });
});
