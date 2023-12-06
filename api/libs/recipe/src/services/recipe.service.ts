import {
  Inject,
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import {
  FilterRecipeDto,
  RecipeDto,
  RecipeListViewResponseDto,
  RecipesAndCountDto,
  RecipesResponseDto,
  TextSearchRecipeDto,
} from '../dto/recipe/filter-recipe.dto';
import {
  CreateMongoRecipeDto,
  CreateRecipeDto,
  UpdateRecipeDto,
} from '../dto/recipe/modify-recipe.dto';
import { MongoRecipeRepository } from '../repositories/recipe/mongo.recipe.repository';
import { RecipeRepository } from '../repositories/recipe/recipe.repository';
import { RecipeViewerIdentifier } from '../dto/recipe-view-log/recipe-viewer-identifier';
import { Logable } from '@app/common/log/log.decorator';
import { RecipeViewLogRepository } from '../repositories/recipe-view-log/recipe-view-log.repository';
import { Cacheable } from '@app/common/cache/cache.service';
import { Recipe } from '../entities/recipe.entity';
import { deleteProps } from '@app/common/utils/delete-props';
import { deleteNull } from '@app/common/utils/delete-null';

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
        ['recipe_steps', 'ingredient_requirements', 'recipe_raw_text'],
      ),
    );
    await this.mongoRecipeRepository.update(mongoRecipe.id.toString(), {
      mysql_id: recipe.id,
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
  ): Promise<RecipeDto> {
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
  async findTopViewed(): Promise<RecipeListViewResponseDto[]> {
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
      recipe_id: id,
      user_id: identifier.user ? identifier.user.id : undefined,
      user_ip: identifier.ip,
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
    const ret = await this.recipeRepository.deleteOne(id);
    if (!ret) throw new NotFoundException('Recipe not found');
    return ret;
  }

  async onApplicationBootstrap() {
    await this.setAllViewedRecipesInPast1Month();

    // let hasNext = true;
    // let page = 0;

    // while (hasNext) {
    //   const ret = (
    //     await this.mongoRecipeRepository.findAllRecipe({
    //       page: ++page,
    //       limit: 10,
    //       mysql_id: null,
    //     })
    //   ).toRecipesResponseDto(page, 10);
    //   const { results, has_next } = ret;
    //   if (results.length === 0) return;
    //   hasNext = has_next;

    //   const mysqlRecipes = await Promise.all(
    //     results.map(async (recipe) => {
    //       return this.recipeRepository.findOneByMongoId(recipe.id as any);
    //     }),
    //   );

    //   await Promise.all(
    //     mysqlRecipes.map(async (recipe) => {
    //       return this.mongoRecipeRepository.update(recipe.mongo_id, {
    //         mysql_id: recipe.id,
    //       });
    //     }),
    //   );
    // }
  }
}
