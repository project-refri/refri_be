import { Recipe as PrismaRecipe } from '../../entities/recipe.entity';
import { Recipe as MongoRecipe } from '../../entities/mongo/mongo.recipe.entity';
import { ICrudRepository } from '@app/common/repository/crud.repository';
import {
  FilterRecipeDto,
  RecipeListViewResponseDto,
  RecipesAndCountDto,
  TextSearchRecipeDto,
} from '../../dto/recipe/filter-recipe.dto';
import { CreateRecipeDto } from '@app/recipe/dto/recipe/create-recipe.dto';
import { UpdateRecipeDto } from '@app/recipe/dto/recipe/update-recipe.dto';

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
