import { ICrudRepository } from '@app/common/repository/crud.repository';
import { RecipeBookmarkEntity as PrismaRecipeBookmark } from '@app/recipe/domain/recipe-bookmark.entity';
import { RecipeBookmark as MongoRecipeBookmark } from '@app/recipe/domain/mongo/mongo.recipe-bookmark.entity';
import { CreateRecipeBookmarkDto } from '@app/recipe/dto/recipe-bookmark/create-recipe-bookmark.dto';
import { FilterRecipeBookmarkDto } from '@app/recipe/dto/recipe-bookmark/filter-recipe-bookmark.dto';
import { RecipeBookmarksAndCountDto } from '@app/recipe/dto/recipe-bookmark/recipe-bookmarks-count.dto';

type RecipeBookmark = MongoRecipeBookmark | PrismaRecipeBookmark;

export interface IRecipeBookmarkRepository
  extends ICrudRepository<RecipeBookmark, CreateRecipeBookmarkDto, any> {
  findAllRecipeBookmarked(
    filterRecipeBookmarkDto: FilterRecipeBookmarkDto,
  ): Promise<RecipeBookmarksAndCountDto>;
}
