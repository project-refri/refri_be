import { ICrudRepository } from '@app/common/repository/crud.repository';
import { RecipeBookmark as PrismaRecipeBookmark } from '../../entities/recipe-bookmark.entity';
import { RecipeBookmark as MongoRecipeBookmark } from '../../entities/mongo/mongo.recipe-bookmark.entity';
import { CreateRecipeBookmarkDto } from '@app/recipe/dto/recipe-bookmark/modify-recipe-bookmark.dto';
import {
  FilterRecipeBookmarkDto,
  RecipeBookmarksAndCountDto,
} from '@app/recipe/dto/recipe-bookmark/filter-recipe-bookmark.dto';

type RecipeBookmark = MongoRecipeBookmark | PrismaRecipeBookmark;

export interface IRecipeBookmarkRepository
  extends ICrudRepository<
    RecipeBookmark,
    CreateRecipeBookmarkDto,
    any,
    FilterRecipeBookmarkDto
  > {
  findAllRecipeBookmarked(
    filterRecipeBookmarkDto: FilterRecipeBookmarkDto,
  ): Promise<RecipeBookmarksAndCountDto>;
}
