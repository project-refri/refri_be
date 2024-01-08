import { FilterRecipeDto } from '@app/recipe/dto/recipe/filter-recipe.dto';
import { MongoRecipeRepository } from '@app/recipe/repositories/recipe/mongo.recipe.repository';
import { RecipeRepository } from '@app/recipe/repositories/recipe/recipe.repository';
import { RecipeService } from '@app/recipe/services/recipe.service';
import { TestBed } from '@automock/jest';
import { RecipeViewLogRepository } from '@app/recipe/repositories/recipe-view-log/recipe-view-log.repository';
import { RecipeViewLog } from '@app/recipe/domain/recipe-view-log.entity';
import { User } from '@app/user/domain/user.entity';
import { Recipe } from '@app/recipe/domain/recipe.entity';
import { Recipe as MongoRecipe } from '@app/recipe/domain/mongo/mongo.recipe.entity';
import { RecipeViewerIdentifier } from '@app/recipe/dto/recipe-view-log/recipe-viewer-identifier';
import { Types } from 'mongoose';
import { CreateMongoRecipeDto } from '@app/recipe/dto/recipe/create-mongo-recipe.dto';
import { UpdateRecipeDto } from '@app/recipe/dto/recipe/update-recipe.dto';
import { TextSearchRecipeDto } from '@app/recipe/dto/recipe/text-search.dto';
import { RecipeDetailDto } from '@app/recipe/dto/recipe/recipe-detail.dto';
import { RecipesItemDto } from '@app/recipe/dto/recipe/recipes-item.dto';
import { RecipesResponseDto } from '@app/recipe/dto/recipe/recipes-response.dto';
import { RecipesAndCountDto } from '@app/recipe/dto/recipe/recipes-count.dto';
import { Diet } from '@app/user/domain/diet.enum';

describe('RecipeService', () => {
  let service: RecipeService;
  let mongoRecipeRepository: jest.Mocked<MongoRecipeRepository>;
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
    recipes: [new RecipesItemDto(), new RecipesItemDto()],
    count: 2,
    toRecipesResponseDto: jest.fn(),
  };
  const recipesAndCountNotLast: jest.Mocked<RecipesAndCountDto> = {
    recipes: [new RecipesItemDto(), new RecipesItemDto()],
    count: 15,
    toRecipesResponseDto: jest.fn(),
  };
  const recipesResponseDtoLast: RecipesResponseDto = {
    results: recipesAndCountLast.recipes,
    page: 1,
    count: 2,
    hasNext: true,
  };
  const recipesResponseDtoNotLast: RecipesResponseDto = {
    results: recipesAndCountNotLast.recipes,
    page: 1,
    count: 2,
    hasNext: false,
  };
  const user = new User({
    id: 1,
    email: 'test@test.com',
    username: 'test',
    introduction: '',
    diet: Diet.NORMAL,
    thumbnail: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const recipe = new Recipe({
    id: 1,
    name: 'test',
    mongoId: 'test',
    description: 'test',
    ownerId: user.id,
    owner: user,
    thumbnail: 'test',
    originUrl: 'test',
    viewCount: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const recipeViewLog = new RecipeViewLog({
    id: 1,
    recipeId: recipe.id,
    recipe,
    userId: user.id,
    user: user,
    userIp: '::1',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(RecipeService).compile();

    service = unit;
    recipeRepository = unitRef.get<RecipeRepository>('PrismaRecipeRepository');
    mongoRecipeRepository = unitRef.get<MongoRecipeRepository>(
      'MongoRecipeRepository',
    );
    recipeViewLogRepository = unitRef.get(RecipeViewLogRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new recipe', async () => {
      const createMongoRecipeDto = new CreateMongoRecipeDto();
      const mongoId = new Types.ObjectId();
      const createRecipeDto = createMongoRecipeDto.toCreateRecipeDto(
        mongoId.toString(),
      );
      const mongoRecipe: MongoRecipe = {
        ...new MongoRecipe(),
        id: mongoId,
      };
      recipeRepository.create.mockResolvedValue(recipe);
      mongoRecipeRepository.create.mockResolvedValue(mongoRecipe);

      const result = await service.create(createMongoRecipeDto);

      expect(mongoRecipeRepository.create).toHaveBeenCalledWith(
        createMongoRecipeDto,
      );
      expect(recipeRepository.create).toHaveBeenCalledWith(createRecipeDto);
      expect(result).toEqual(recipe);
    });
  });

  describe('findAll', () => {
    it('should return an array of recipes with last elements', async () => {
      recipeRepository.findAllRecipe.mockResolvedValue(recipesAndCountLast);
      recipesAndCountLast.toRecipesResponseDto.mockReturnValue(
        recipesResponseDtoLast,
      );

      const result = await service.findAll(filterRecipeDto);

      expect(recipeRepository.findAllRecipe).toHaveBeenCalledWith(
        filterRecipeDto,
      );
      expect(recipesAndCountLast.toRecipesResponseDto).toHaveBeenCalledWith(
        filterRecipeDto.page,
        filterRecipeDto.limit,
      );
      expect(result).toEqual(recipesResponseDtoLast);
    });

    it('should return an array of recipes with not finished', async () => {
      recipeRepository.findAllRecipe.mockResolvedValue(recipesAndCountNotLast);
      recipesAndCountNotLast.toRecipesResponseDto.mockReturnValue(
        recipesResponseDtoNotLast,
      );

      const result = await service.findAll(filterRecipeDto);

      expect(recipeRepository.findAllRecipe).toHaveBeenCalledWith(
        filterRecipeDto,
      );
      expect(recipesAndCountNotLast.toRecipesResponseDto).toHaveBeenCalledWith(
        filterRecipeDto.page,
        filterRecipeDto.limit,
      );
      expect(result).toEqual(recipesResponseDtoNotLast);
    });
  });

  describe('findAllByFullTextSearch', () => {
    it('should return an last element array of recipes without search query', async () => {
      recipeRepository.findAllRecipe.mockResolvedValue(recipesAndCountLast);
      recipesAndCountLast.toRecipesResponseDto.mockReturnValue(
        recipesResponseDtoLast,
      );

      const result = await service.findAllByFullTextSearch(filterRecipeDto);

      expect(recipeRepository.findAllRecipe).toHaveBeenCalledWith(
        filterRecipeDto,
      );
      expect(
        mongoRecipeRepository.findAllByFullTextSearch,
      ).not.toHaveBeenCalled();
      expect(recipesAndCountLast.toRecipesResponseDto).toHaveBeenCalledWith(
        filterRecipeDto.page,
        filterRecipeDto.limit,
      );
      expect(result).toEqual(recipesResponseDtoLast);
    });

    it('should return an last elements array of recipes with search query', async () => {
      recipesAndCountLast.toRecipesResponseDto.mockReturnValue(
        recipesResponseDtoLast,
      );
      mongoRecipeRepository.findAllByFullTextSearch.mockResolvedValue(
        recipesAndCountLast,
      );

      const result = await service.findAllByFullTextSearch(textSearchRecipeDto);

      expect(
        mongoRecipeRepository.findAllByFullTextSearch,
      ).toHaveBeenCalledWith(textSearchRecipeDto);
      expect(recipeRepository.findAllRecipe).not.toHaveBeenCalled();
      expect(recipesAndCountLast.toRecipesResponseDto).toHaveBeenCalledWith(
        textSearchRecipeDto.page,
        textSearchRecipeDto.limit,
      );
      expect(result).toEqual(recipesResponseDtoLast);
    });

    it('should return an middle elements array of recipes without search query', async () => {
      recipeRepository.findAllRecipe.mockResolvedValue(recipesAndCountNotLast);
      recipesAndCountNotLast.toRecipesResponseDto.mockReturnValue(
        recipesResponseDtoNotLast,
      );

      const result = await service.findAllByFullTextSearch(filterRecipeDto);

      expect(recipeRepository.findAllRecipe).toHaveBeenCalledWith(
        filterRecipeDto,
      );
      expect(recipeRepository.findAllByFullTextSearch).not.toHaveBeenCalled();
      expect(recipesAndCountNotLast.toRecipesResponseDto).toHaveBeenCalledWith(
        filterRecipeDto.page,
        filterRecipeDto.limit,
      );
      expect(result).toEqual(recipesResponseDtoNotLast);
    });

    it('should return an middle elements array of recipes with search query', async () => {
      recipesAndCountNotLast.toRecipesResponseDto.mockReturnValue(
        recipesResponseDtoNotLast,
      );
      mongoRecipeRepository.findAllByFullTextSearch.mockResolvedValue(
        recipesAndCountNotLast,
      );

      const result = await service.findAllByFullTextSearch(textSearchRecipeDto);

      expect(
        mongoRecipeRepository.findAllByFullTextSearch,
      ).toHaveBeenCalledWith(textSearchRecipeDto);
      expect(recipeRepository.findAllRecipe).not.toHaveBeenCalled();
      expect(recipesAndCountNotLast.toRecipesResponseDto).toHaveBeenCalledWith(
        textSearchRecipeDto.page,
        textSearchRecipeDto.limit,
      );
      expect(result).toEqual(recipesResponseDtoNotLast);
    });
  });

  describe('findOne', () => {
    it('should return a recipe', async () => {
      const recipeDto = new RecipeDetailDto();
      mongoRecipeRepository.findOneByMysqlId.mockResolvedValue(recipeDto);
      recipeRepository.increaseViewCount.mockResolvedValue(recipe);
      mongoRecipeRepository.increaseViewCountByMySqlId.mockResolvedValue(
        new MongoRecipe(),
      );
      recipeViewLogRepository.create.mockResolvedValue(recipeViewLog);

      const result = await service.findOne(1, {
        ip: '::1',
        user: new User({
          id: 1,
          email: 'test@test.com',
          username: 'test',
          introduction: '',
          diet: Diet.NORMAL,
          thumbnail: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      });

      expect(recipeRepository.increaseViewCount).toHaveBeenCalledWith(1);
      expect(recipeViewLogRepository.create).toHaveBeenCalledWith({
        recipeId: 1,
        userId: 1,
        userIp: '::1',
      });
      expect(mongoRecipeRepository.findOneByMysqlId).toHaveBeenCalledWith(1);
      expect(result).toEqual(recipeDto);
    });
  });

  describe('findTopViewed', () => {
    it('should return an array of recipes', async () => {
      const recipe = new RecipesItemDto();
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

  describe('findAllRecentViewed', () => {
    it('should return an array of last elements of recipes', async () => {
      recipeViewLogRepository.findAllRecentViewed.mockResolvedValue(
        recipesAndCountLast,
      );
      recipesAndCountLast.toRecipesResponseDto.mockReturnValue(
        recipesResponseDtoLast,
      );

      const result = await service.findAllRecentViewed(
        filterRecipeDto,
        new RecipeViewerIdentifier(
          new User({
            id: 1,
            email: 'test@test.com',
            username: 'test',
            introduction: '',
            diet: Diet.NORMAL,
            thumbnail: '',
            createdAt: new Date(),
            updatedAt: new Date(),
          }),
          null,
        ),
      );

      expect(recipeViewLogRepository.findAllRecentViewed).toHaveBeenCalledWith(
        filterRecipeDto,
        1,
      );
      expect(recipesAndCountLast.toRecipesResponseDto).toHaveBeenCalledWith(
        filterRecipeDto.page,
        filterRecipeDto.limit,
      );
      expect(result).toEqual(recipesResponseDtoLast);
    });

    it('should return an array of middle elements of recipes', async () => {
      recipeViewLogRepository.findAllRecentViewed.mockResolvedValue(
        recipesAndCountNotLast,
      );
      recipesAndCountNotLast.toRecipesResponseDto.mockReturnValue(
        recipesResponseDtoNotLast,
      );

      const result = await service.findAllRecentViewed(
        filterRecipeDto,
        new RecipeViewerIdentifier(
          new User({
            id: 1,
            email: 'test@test.com',
            username: 'test',
            introduction: '',
            diet: Diet.NORMAL,
            thumbnail: '',
            createdAt: new Date(),
            updatedAt: new Date(),
          }),
          null,
        ),
      );

      expect(recipeViewLogRepository.findAllRecentViewed).toHaveBeenCalledWith(
        filterRecipeDto,
        1,
      );
      expect(recipesAndCountNotLast.toRecipesResponseDto).toHaveBeenCalledWith(
        filterRecipeDto.page,
        filterRecipeDto.limit,
      );
      expect(result).toEqual(recipesResponseDtoNotLast);
    });
  });

  describe('viewRecipe', () => {
    it('should return true', async () => {
      recipeRepository.increaseViewCount.mockResolvedValue(recipe);
      mongoRecipeRepository.increaseViewCountByMySqlId.mockResolvedValue(
        new MongoRecipe(),
      );
      recipeViewLogRepository.create.mockResolvedValue(recipeViewLog);

      const result = await service.viewRecipe(1, {
        ip: '::1',
        user: new User({
          id: 1,
          email: 'test@test.com',
          username: 'test',
          introduction: '',
          diet: Diet.NORMAL,
          thumbnail: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      });

      expect(recipeRepository.increaseViewCount).toHaveBeenCalledWith(1);
      expect(recipeViewLogRepository.create).toHaveBeenCalledWith({
        recipeId: 1,
        userId: 1,
        userIp: '::1',
      });
      expect(result).toEqual(true);
    });

    it('should throw NotFoundException', async () => {
      recipeRepository.increaseViewCount.mockResolvedValue(null);
      mongoRecipeRepository.increaseViewCountByMySqlId.mockResolvedValue(null);

      await expect(
        service.viewRecipe(1, {
          ip: '::1',
          user: new User({
            id: 1,
            email: 'test@test.com',
            username: 'test',
            introduction: '',
            diet: Diet.NORMAL,
            thumbnail: '',
            createdAt: new Date(),
            updatedAt: new Date(),
          }),
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
      recipeRepository.update.mockResolvedValue(recipe);

      const result = await service.update(1, {} as UpdateRecipeDto);

      expect(recipeRepository.update).toHaveBeenCalledWith(1, {});
      expect(result).toEqual(recipe);
    });

    it('should throw NotFoundException', async () => {
      recipeRepository.update.mockResolvedValue(null);

      await expect(
        service.update(1, {} as UpdateRecipeDto),
      ).rejects.toThrowError('Recipe not found');
    });
  });

  describe('deleteOne', () => {
    it('should delete well', async () => {
      recipeRepository.deleteOne.mockResolvedValue(recipe);
      mongoRecipeRepository.deleteOneByMysqlId.mockResolvedValue(
        new MongoRecipe(),
      );

      const result = await service.deleteOne(1);

      expect(recipeRepository.deleteOne).toHaveBeenCalledWith(1);
      expect(mongoRecipeRepository.deleteOneByMysqlId).toHaveBeenCalledWith(1);
      expect(result).toEqual(recipe);
    });

    it('should throw NotFoundException', async () => {
      recipeRepository.deleteOne.mockResolvedValue(null);
      mongoRecipeRepository.deleteOneByMysqlId.mockResolvedValue(null);

      await expect(service.deleteOne(1)).rejects.toThrowError(
        'Recipe not found',
      );
    });
  });
});
