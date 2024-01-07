import { PartialType } from '@nestjs/swagger';
import { CreateUserIngredientDto } from '@app/ingredient/dto/create-user-ingredient.dto';

export class UpdateUserIngredientDto extends PartialType(
  CreateUserIngredientDto,
) {}
