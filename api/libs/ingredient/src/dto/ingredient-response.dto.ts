import {
  CreatedResponse,
  OkResponse,
} from '@app/common/dto/success-response.dto';
import { UserIngredient } from '../entities/user-ingredient.entity';

export class CreateUserIngredientResponseDto extends CreatedResponse {
  data: UserIngredient;
}

export class FindAllUserIngredientResponseDto extends OkResponse {
  data: UserIngredient[];
}

export class FindOneUserIngredientResponseDto extends OkResponse {
  data: UserIngredient;
}

export class UpdateUserIngredientResponseDto extends OkResponse {
  data: UserIngredient;
}
