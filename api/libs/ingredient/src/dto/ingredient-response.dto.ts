import {
  CreatedResponse,
  OkResponse,
} from '@app/common/dto/success-response.dto';
import { BarcodeInfos } from 'proto/image_process/BarcodeInfos';
import { UserIngredientDto } from '@app/ingredient/dto/user-ingredient.dto';

export class CreateUserIngredientResponseDto extends CreatedResponse {
  data: UserIngredientDto;
}

export class FindAllUserIngredientResponseDto extends OkResponse {
  data: UserIngredientDto[];
}

export class FindOneUserIngredientResponseDto extends OkResponse {
  data: UserIngredientDto;
}

export class UpdateUserIngredientResponseDto extends OkResponse {
  data: UserIngredientDto;
}

export class GetIngredientInfoResponseDto extends OkResponse {
  data: BarcodeInfos;
}
