import {
  CreatedResponse,
  OkResponse,
} from '@app/common/dto/success-response.dto';
import { RecipeDetailDto } from '@app/recipe/dto/recipe/recipe-detail.dto';
import { RecipesItemDto } from '@app/recipe/dto/recipe/recipes-item.dto';
import { RecipesResponseDto } from '@app/recipe/dto/recipe/recipes-response.dto';
import { RecipeDto } from '@app/recipe/dto/recipe/recipe.dto';

export class CreateRecipeResponseDto extends CreatedResponse {
  data: RecipeDto;
}

export class FindRecipesResponseDto extends OkResponse {
  data: RecipesResponseDto;
}

export class FindTopViewdResponseDto extends OkResponse {
  data: RecipesItemDto[];
}

export class FindRecentViewedResponseDto extends OkResponse {
  data: RecipesResponseDto;
}

export class FindOneRecipeResponseDto extends OkResponse {
  data: RecipeDetailDto;
}

export class UpdateRecipeResponseDto extends OkResponse {
  data: RecipeDto;
}
