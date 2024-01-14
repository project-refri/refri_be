import {
  CreatedResponse,
  OkResponse,
} from '@app/common/dto/success-response.dto';
import { RecipeBookmarksResponseDto } from '@app/recipe/dto/recipe-bookmark/recipe-bookmarks-response.dto';
import { ErrorResponse } from '@app/common/dto/error-response.dto';
import {
  RecipeBookmarkDuplicateException,
  RecipeNotExistsException,
  UserNotExistsException,
} from '@app/recipe/exception/domain.exception';
import { RecipeBookmarkDto } from '@app/recipe/dto/recipe-bookmark/recipe-bookmark.dto';

export class CreateRecipeBookmarkResponseDto extends CreatedResponse {
  data: RecipeBookmarkDto;
}

export class FindRecipeBookmarksResponseDto extends OkResponse {
  data: RecipeBookmarksResponseDto;
}

export class RecipeNotExistsResponseDto extends ErrorResponse {
  error = {
    name: RecipeNotExistsException.name,
    message: RecipeNotExistsException.message,
  };
}

export class UserNotExistsResponseDto extends ErrorResponse {
  error = {
    name: UserNotExistsException.name,
    message: UserNotExistsException.message,
  };
}

export class RecipeBookmarkDuplicateResponseDto extends ErrorResponse {
  error = {
    name: RecipeBookmarkDuplicateException.name,
    message: RecipeBookmarkDuplicateException.message,
  };
}
