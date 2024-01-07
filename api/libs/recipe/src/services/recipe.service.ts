import {
  Inject,
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { FilterRecipeDto } from '../dto/recipe/filter-recipe.dto';
import { MongoRecipeRepository } from '../repositories/recipe/mongo.recipe.repository';
import { RecipeRepository } from '../repositories/recipe/recipe.repository';
import { RecipeViewerIdentifier } from '../dto/recipe-view-log/recipe-viewer-identifier';
import { Logable } from '@app/common/log/log.decorator';
import { RecipeViewLogRepository } from '../repositories/recipe-view-log/recipe-view-log.repository';
import { Cacheable } from '@app/common/cache/cache.service';
import { Recipe } from '@app/recipe/domain/recipe.entity';
import { deleteProps } from '@app/common/utils/delete-props';
import { deleteNull } from '@app/common/utils/delete-null';
import { CreateMongoRecipeDto } from '../dto/recipe/create-mongo-recipe.dto';
import { UpdateRecipeDto } from '../dto/recipe/update-recipe.dto';
import { TextSearchRecipeDto } from '@app/recipe/dto/recipe/text-search.dto';
import { RecipeDetailDto } from '@app/recipe/dto/recipe/recipe-detail.dto';
import { RecipesItemDto } from '@app/recipe/dto/recipe/recipes-item.dto';
import { RecipesResponseDto } from '@app/recipe/dto/recipe/recipes-response.dto';
import { RecipesAndCountDto } from '@app/recipe/dto/recipe/recipes-count.dto';

@Injectable()
export class RecipeService implements OnApplicationBootstrap {
  constructor(
    @Inject('MongoRecipeRepository')
    private readonly mongoRecipeRepository: MongoRecipeRepository,
    @Inject('PrismaRecipeRepository')
    private readonly recipeRepository: RecipeRepository,
    private readonly recipeViewLogRepository: RecipeViewLogRepository,
  ) {}

  @Logable()
  async create(createRecipeDto: CreateMongoRecipeDto): Promise<Recipe> {
    const mongoRecipe = await this.mongoRecipeRepository.create(
      deleteNull(createRecipeDto),
    );
    const recipe = await this.recipeRepository.create(
      deleteProps(
        {
          ...createRecipeDto,
          mongo_id: mongoRecipe.id.toString(),
        },
        ['recipeSteps', 'ingredientRequirements', 'recipeRawText'],
      ),
    );
    await this.mongoRecipeRepository.update(mongoRecipe.id.toString(), {
      mysqlId: recipe.id,
    });
    return recipe;
  }

  @Logable()
  async findAll(filterRecipeDto: FilterRecipeDto): Promise<RecipesResponseDto> {
    const { page, limit } = filterRecipeDto;
    const results = await this.recipeRepository.findAllRecipe(filterRecipeDto);
    return results.toRecipesResponseDto(page, limit);
  }

  @Logable()
  async findAllByFullTextSearch(
    textSearchRecipeDto: TextSearchRecipeDto,
  ): Promise<RecipesResponseDto> {
    const { page, limit } = textSearchRecipeDto;
    let results: RecipesAndCountDto;
    if (
      textSearchRecipeDto.searchQuery &&
      textSearchRecipeDto.searchQuery.length > 0
    ) {
      results = await this.mongoRecipeRepository.findAllByFullTextSearch(
        textSearchRecipeDto,
      );
    } else
      results = await this.recipeRepository.findAllRecipe(
        new FilterRecipeDto(page, limit),
      );
    return results.toRecipesResponseDto(page, limit);
  }

  @Logable()
  async findAllRecentViewed(
    filterRecipeDto: FilterRecipeDto,
    identifier: RecipeViewerIdentifier,
  ): Promise<RecipesResponseDto> {
    const { page, limit } = filterRecipeDto;
    const results = await this.recipeViewLogRepository.findAllRecentViewed(
      filterRecipeDto,
      identifier.user.id,
    );
    return results.toRecipesResponseDto(page, limit);
  }

  @Logable()
  async findOne(
    id: number,
    identifier: RecipeViewerIdentifier,
  ): Promise<RecipeDetailDto> {
    const ret = (
      await Promise.all([
        this.mongoRecipeRepository.findOneByMysqlId(id),
        this.viewRecipe(id, identifier),
      ])
    )[0];
    if (!ret) throw new NotFoundException('Recipe not found');
    return ret;
  }

  @Logable()
  async findTopViewed(): Promise<RecipesItemDto[]> {
    return await this.recipeViewLogRepository.findAll5MostViewedRecipesInPast1Month();
  }

  @Logable()
  @Cacheable({
    ttl: 60 * 60 * 1000,
    keyGenerator: (id: number, identifier: RecipeViewerIdentifier) =>
      identifier.user
        ? `recipe-view:${id}-${identifier.user.id}`
        : `recipe-view:${id}-${identifier.ip}`,
  })
  async viewRecipe(
    id: number,
    identifier: RecipeViewerIdentifier,
  ): Promise<boolean> {
    const ret = await Promise.all([
      this.recipeRepository.increaseViewCount(id),
      this.mongoRecipeRepository.increaseViewCountByMySqlId(id),
    ]);
    if (!ret[0] || !ret[1]) throw new NotFoundException('Recipe not found');
    const recipeViewLog = await this.recipeViewLogRepository.create({
      recipeId: id,
      userId: identifier.user ? identifier.user.id : undefined,
      userIp: identifier.ip,
    });
    return true;
  }

  @Logable()
  async setAllViewedRecipesInPast1Month() {
    if (await this.recipeViewLogRepository.checkIfRecipeViewCountKeyExists())
      return;
    await this.recipeViewLogRepository.setAllViewedRecipesInPast1Month();
  }

  @Logable()
  async update(id: number, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
    const ret = await this.recipeRepository.update(id, updateRecipeDto);
    if (!ret) throw new NotFoundException('Recipe not found');
    return ret;
  }

  async deleteOne(id: number): Promise<Recipe> {
    const ret = await Promise.all([
      this.recipeRepository.deleteOne(id),
      this.mongoRecipeRepository.deleteOneByMysqlId(id),
    ]);
    if (!ret[0] || !ret[1]) throw new NotFoundException('Recipe not found');
    return ret[0];
  }

  async onApplicationBootstrap() {
    await this.setAllViewedRecipesInPast1Month();
  }
}
