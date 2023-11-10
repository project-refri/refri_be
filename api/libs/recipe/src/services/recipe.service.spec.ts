import { User } from '@app/user/entities/user.entity';
import {
  FilterRecipeDto,
  RecipeListViewResponseDto,
  RecipesAndCountDto,
  RecipesResponseDto,
  TextSearchRecipeDto,
} from '../dto/recipe/filter-recipe.dto';
import {
  CreateRecipeDto,
  UpdateRecipeDto,
} from '../dto/recipe/modify-recipe.dto';
import { Recipe } from '../entities/recipe.entity';
import { RecipeRepository } from '../repositories/recipe.repository';
import { RecipeService } from './recipe.service';
import { TestBed } from '@automock/jest';
import { RecipeViewLogRepository } from '../repositories/recipe-view-log.repository';
import { RecipeViewLog } from '../entities/recipe-view-log.entity';

describe('RecipeService', () => {
  let service: RecipeService;
  let recipeRepository: jest.Mocked<RecipeRepository>;
  let recipeViewLogRepository: jest.Mocked<RecipeViewLogRepository>;

  const filterRecipeDto: FilterRecipeDto = {
    page: 1,
    limit: 2,
  };
  const textSearchRecipeDto: TextSearchRecipeDto = {
    searchQuery: 'test',
    page: 1,
    limit: 10,
  };
  const recipesAndCountLast: jest.Mocked<RecipesAndCountDto> = {
    recipes: [new RecipeListViewResponseDto(), new RecipeListViewResponseDto()],
    count: 2,
    toRecipesResponseDto: jest.fn(),
  };
  const recipesAndCountNotLast: jest.Mocked<RecipesAndCountDto> = {
    recipes: [new RecipeListViewResponseDto(), new RecipeListViewResponseDto()],
    count: 15,
    toRecipesResponseDto: jest.fn(),
  };
  const recipesResponseDtoLast: RecipesResponseDto = {
    results: recipesAndCountLast.recipes,
    page: 1,
    count: 2,
    has_next: true,
  };
  const recipesResponseDtoNotLast: RecipesResponseDto = {
    results: recipesAndCountNotLast.recipes,
    page: 1,
    count: 2,
    has_next: false,
  };

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(RecipeService).compile();

    service = unit;
    recipeRepository = unitRef.get(RecipeRepository);
    recipeViewLogRepository = unitRef.get(RecipeViewLogRepository);
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

  describe('findAll', () => {
    it('should return an array of recipes with last elements', async () => {
      recipeRepository.findAll.mockResolvedValue(recipesAndCountLast);
      recipesAndCountLast.toRecipesResponseDto.mockReturnValue(
        recipesResponseDtoLast,
      );

      const result = await service.findAll(filterRecipeDto);

      expect(recipeRepository.findAll).toHaveBeenCalledWith(filterRecipeDto);
      expect(recipesAndCountLast.toRecipesResponseDto).toHaveBeenCalledWith(
        filterRecipeDto.page,
        filterRecipeDto.limit,
      );
      expect(result).toEqual(recipesResponseDtoLast);
    });

    it('should return an array of recipes with not finished', async () => {
      recipeRepository.findAll.mockResolvedValue(recipesAndCountNotLast);
      recipesAndCountNotLast.toRecipesResponseDto.mockReturnValue(
        recipesResponseDtoNotLast,
      );

      const result = await service.findAll(filterRecipeDto);

      expect(recipeRepository.findAll).toHaveBeenCalledWith(filterRecipeDto);
      expect(recipesAndCountNotLast.toRecipesResponseDto).toHaveBeenCalledWith(
        filterRecipeDto.page,
        filterRecipeDto.limit,
      );
      expect(result).toEqual(recipesResponseDtoNotLast);
    });
  });

  describe('findAllByFullTextSearch', () => {
    it('should return an array of recipes without search query', async () => {
      recipeRepository.findAll.mockResolvedValue(recipesAndCountLast);
      recipesAndCountLast.toRecipesResponseDto.mockReturnValue(
        recipesResponseDtoLast,
      );

      const result = await service.findAllByFullTextSearch(filterRecipeDto);

      expect(recipeRepository.findAll).toHaveBeenCalledWith(filterRecipeDto);
      expect(recipeRepository.findAllByFullTextSearch).not.toHaveBeenCalled();
      expect(recipesAndCountLast.toRecipesResponseDto).toHaveBeenCalledWith(
        filterRecipeDto.page,
        filterRecipeDto.limit,
      );
      expect(result).toEqual(recipesResponseDtoLast);
    });

    it('should return an last elements array of recipes with search query', async () => {
      recipeRepository.findAll.mockResolvedValue(recipesAndCountLast);
      recipesAndCountLast.toRecipesResponseDto.mockReturnValue(
        recipesResponseDtoLast,
      );
      recipeRepository.findAllByFullTextSearch.mockResolvedValue(
        recipesAndCountLast,
      );

      const result = await service.findAllByFullTextSearch(textSearchRecipeDto);

      expect(recipeRepository.findAllByFullTextSearch).toHaveBeenCalledWith(
        textSearchRecipeDto,
      );
      expect(recipeRepository.findAll).not.toHaveBeenCalled();
      expect(recipesAndCountLast.toRecipesResponseDto).toHaveBeenCalledWith(
        textSearchRecipeDto.page,
        textSearchRecipeDto.limit,
      );
      expect(result).toEqual(recipesResponseDtoLast);
    });

    it('should return an middle elements array of recipes with search query', async () => {
      recipeRepository.findAll.mockResolvedValue(recipesAndCountNotLast);
      recipesAndCountNotLast.toRecipesResponseDto.mockReturnValue(
        recipesResponseDtoNotLast,
      );
      recipeRepository.findAllByFullTextSearch.mockResolvedValue(
        recipesAndCountNotLast,
      );

      const result = await service.findAllByFullTextSearch(textSearchRecipeDto);

      expect(recipeRepository.findAllByFullTextSearch).toHaveBeenCalledWith(
        textSearchRecipeDto,
      );
      expect(recipeRepository.findAll).not.toHaveBeenCalled();
      expect(recipesAndCountNotLast.toRecipesResponseDto).toHaveBeenCalledWith(
        textSearchRecipeDto.page,
        textSearchRecipeDto.limit,
      );
      expect(result).toEqual(recipesResponseDtoNotLast);
    });
  });

  describe('findOne', () => {
    it('should return a recipe', async () => {
      const recipe = new Recipe();
      recipeRepository.findOne.mockResolvedValue(recipe);

      const result = await service.findOne('1');

      expect(recipeRepository.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(recipe);
    });
  });

  describe('findTopViewed', () => {
    it('should return an array of recipes', async () => {
      const recipe = new RecipeListViewResponseDto();
      recipeViewLogRepository.findAll5MostViewedRecipesInPast1Month.mockResolvedValue(
        [recipe],
      );

      const result = await service.findTopViewed();

      expect(
        recipeViewLogRepository.findAll5MostViewedRecipesInPast1Month,
      ).toHaveBeenCalled();
      expect(result).toEqual([recipe]);
    });
  });

  describe('viewRecipe', () => {
    it('should return true', async () => {
      recipeRepository.increaseViewCount.mockResolvedValue(new Recipe());
      recipeViewLogRepository.create.mockResolvedValue(new RecipeViewLog());

      const result = await service.viewRecipe('1', {
        ip: '::1',
        user: {
          ...new User(),
          id: '1' as any,
        },
      });

      expect(recipeRepository.increaseViewCount).toHaveBeenCalledWith('1');
      expect(recipeViewLogRepository.create).toHaveBeenCalledWith({
        recipe_id: '1',
        user_id: '1',
        user_ip: '::1',
      });
      expect(result).toEqual(true);
    });

    it('should throw NotFoundException', async () => {
      recipeRepository.increaseViewCount.mockResolvedValue(null);

      await expect(
        service.viewRecipe('1', {
          ip: '::1',
          user: new User(),
        }),
      ).rejects.toThrowError('Recipe not found');
    });
  });

  describe('setAllViewedRecipesInPast1Month', () => {
    it('should set all viewed recipes in past 1 month', async () => {
      recipeViewLogRepository.checkIfRecipeViewCountKeyExists.mockResolvedValue(
        false,
      );
      recipeViewLogRepository.setAllViewedRecipesInPast1Month.mockResolvedValue(
        undefined,
      );

      await service.setAllViewedRecipesInPast1Month();

      expect(
        recipeViewLogRepository.checkIfRecipeViewCountKeyExists,
      ).toHaveBeenCalled();
      expect(
        recipeViewLogRepository.setAllViewedRecipesInPast1Month,
      ).toHaveBeenCalled();
    });

    it('should not set all viewed recipes in past 1 month', async () => {
      recipeViewLogRepository.checkIfRecipeViewCountKeyExists.mockResolvedValue(
        true,
      );
      recipeViewLogRepository.setAllViewedRecipesInPast1Month.mockResolvedValue(
        undefined,
      );

      await service.setAllViewedRecipesInPast1Month();

      expect(
        recipeViewLogRepository.checkIfRecipeViewCountKeyExists,
      ).toHaveBeenCalled();
      expect(
        recipeViewLogRepository.setAllViewedRecipesInPast1Month,
      ).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update well', async () => {
      const recipe = new Recipe();
      recipeRepository.update.mockResolvedValue(recipe);

      const result = await service.update('1', {} as UpdateRecipeDto);

      expect(recipeRepository.update).toHaveBeenCalledWith('1', {});
      expect(result).toEqual(recipe);
    });

    it('should throw NotFoundException', async () => {
      recipeRepository.update.mockResolvedValue(null);

      await expect(
        service.update('1', {} as UpdateRecipeDto),
      ).rejects.toThrowError('Recipe not found');
    });
  });

  describe('deleteOne', () => {
    it('should delete well', async () => {
      const recipe = new Recipe();
      recipeRepository.deleteOne.mockResolvedValue(recipe);

      const result = await service.deleteOne('1');

      expect(recipeRepository.deleteOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(recipe);
    });

    it('should throw NotFoundException', async () => {
      recipeRepository.deleteOne.mockResolvedValue(null);

      await expect(service.deleteOne('1')).rejects.toThrowError(
        'Recipe not found',
      );
    });
  });
});
