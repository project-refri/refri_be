import { ICrudRepository } from '@app/common/repository/crud.repository';
import { RecipeViewLog as MongoRecipeViewLog } from '@app/recipe/entities/mongo/mongo.recipe-view-log.entity';
import { RecipeViewLog as PrismaRecipeViewLog } from '@app/recipe/entities/recipe-view-log.entity';
import { CreateRecipeViewLogDto } from '@app/recipe/dto/recipe-view-log/modify-recipe-view-log.dto';
import { RecipeListViewResponseDto } from '@app/recipe/dto/recipe/filter-recipe.dto';

type RecipeViewLog = MongoRecipeViewLog | PrismaRecipeViewLog;

export interface IRecipeViewLogRepository
  extends ICrudRepository<RecipeViewLog, CreateRecipeViewLogDto, any, any> {
  checkIfRecipeViewCountKeyExists(): Promise<boolean>;
  setAllViewedRecipesInPast1Month(): Promise<void>;
  findAll5MostViewedRecipesInPast1Month(): Promise<RecipeListViewResponseDto[]>;
}
