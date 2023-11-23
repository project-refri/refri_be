import { Recipe as PrismaRecipe } from '../../entities/recipe.entity';
import { Recipe as MongoRecipe } from '../../entities/mongo/mongo.recipe.entity';
import { ICrudRepository } from '@app/common/repository/crud.repository';
import {
  CreateRecipeDto,
  UpdateRecipeDto,
} from '../../dto/recipe/modify-recipe.dto';
import {
  FilterRecipeDto,
  RecipeListViewResponseDto,
  RecipesAndCountDto,
  TextSearchRecipeDto,
} from '../../dto/recipe/filter-recipe.dto';

type Recipe = PrismaRecipe | MongoRecipe;

export interface IRecipeRepository
  extends ICrudRepository<
    Recipe,
    CreateRecipeDto,
    UpdateRecipeDto,
    FilterRecipeDto
  > {
  findAllByFullTextSearch(
    textSearchRecipeDto: TextSearchRecipeDto,
  ): Promise<RecipesAndCountDto>;
  findTopViewed(): Promise<RecipeListViewResponseDto[]>;

  findAllByIds(ids: number[]): Promise<RecipeListViewResponseDto[]>;

  increaseViewCount(id: number): Promise<Recipe>;
}
