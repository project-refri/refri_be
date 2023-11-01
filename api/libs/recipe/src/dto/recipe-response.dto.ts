import {
  CreatedResponse,
  OkResponse,
} from '@app/common/dto/success-response.dto';
import { Recipe } from '../entities/recipe.entity';
import {
  RecipeDto,
  RecipeListViewResponseDto,
  RecipesResponseDto,
} from './filter-recipe.dto';

export class CreateRecipeResponseDto extends CreatedResponse {
  data: Recipe;
}

export class FindRecipesResponseDto extends OkResponse {
  data: RecipesResponseDto;
}

export class FindTopViewdResponseDto extends OkResponse {
  data: RecipeListViewResponseDto[];
}

export class FindOneRecipeResponseDto extends OkResponse {
  data: RecipeDto;
}

export class UpdateRecipeResponseDto extends OkResponse {
  data: Recipe;
}
