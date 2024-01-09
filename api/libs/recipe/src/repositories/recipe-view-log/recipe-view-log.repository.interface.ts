import { ICrudRepository } from '@app/common/repository/crud.repository';
import { RecipeViewLog as MongoRecipeViewLog } from '@app/recipe/domain/mongo/mongo.recipe-view-log.entity';
import { RecipeViewLogEntity as PrismaRecipeViewLog } from '@app/recipe/domain/recipe-view-log.entity';
import { CreateRecipeViewLogDto } from '@app/recipe/dto/recipe-view-log/create-recipe-view-log.dto';

import { RecipesItemDto } from '@app/recipe/dto/recipe/recipes-item.dto';

type RecipeViewLog = MongoRecipeViewLog | PrismaRecipeViewLog;

export interface IRecipeViewLogRepository
  extends ICrudRepository<RecipeViewLog, CreateRecipeViewLogDto, any> {
  checkIfRecipeViewCountKeyExists(): Promise<boolean>;

  setAllViewedRecipesInPast1Month(): Promise<void>;

  findAll5MostViewedRecipesInPast1Month(): Promise<RecipesItemDto[]>;
}
