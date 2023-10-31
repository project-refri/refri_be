import {
  CreatedResponse,
  OkResponse,
} from '@app/common/dto/success-response.dto';
import { RecipeBookmarksResponseDto } from './filter-recipe-bookmark.dto';
import { RecipeBookmark } from '../entities/recipe-bookmark.entity';

export class CreateRecipeBookmarkResponseDto extends CreatedResponse {
  data: RecipeBookmark;
}

export class FindRecipeBookmarksResponseDto extends OkResponse {
  data: RecipeBookmarksResponseDto;
}
