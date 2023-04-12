import {
  CreatedResponse,
  OkResponse,
} from '@app/common/dto/success-response.dto';
import { Ingredient } from '../entities/ingredient.entity';

export class CreateIngredientResponseDto extends CreatedResponse {
  data: Ingredient;
}

export class FindAllIngredientResponseDto extends OkResponse {
  data: Ingredient[];
}

export class FindOneIngredientResponseDto extends OkResponse {
  data: Ingredient;
}

export class UpdateIngredientResponseDto extends OkResponse {
  data: Ingredient;
}
