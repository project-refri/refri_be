import {
  CreatedResponse,
  OkResponse,
} from '@app/common/dto/success-response.dto';
import { Recipe } from '../entities/recipe.entity';

export class CreateRecipeResponseDto extends CreatedResponse {
  data: Recipe;
}

export class FindAllRecipeResponseDto extends OkResponse {
  data: Recipe[];
}

export class FindOneRecipeResponseDto extends OkResponse {
  data: Recipe;
}

export class UpdateRecipeResponseDto extends OkResponse {
  data: Recipe;
}
