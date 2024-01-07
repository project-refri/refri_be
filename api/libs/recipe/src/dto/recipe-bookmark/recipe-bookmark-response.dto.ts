import {
  CreatedResponse,
  OkResponse,
} from '@app/common/dto/success-response.dto';
import { RecipeBookmark } from '@app/recipe/domain/recipe-bookmark.entity';
import { RecipeBookmarksResponseDto } from '@app/recipe/dto/recipe-bookmark/recipe-bookmarks-response.dto';

export class CreateRecipeBookmarkResponseDto extends CreatedResponse {
  data: RecipeBookmark;
}

export class FindRecipeBookmarksResponseDto extends OkResponse {
  data: RecipeBookmarksResponseDto;
}
