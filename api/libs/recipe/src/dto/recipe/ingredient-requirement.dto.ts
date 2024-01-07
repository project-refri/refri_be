import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiExpose } from '@app/common/decorators/api-expose.decorator';

export class IngredientRequirementDto {
  @ApiExpose({ name: 'ingredient_id', isOptional: true })
  @IsMongoId()
  @IsOptional()
  @IsString()
  ingredientId?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  amount: string;

  constructor(ingredientId: string, name: string, amount: string) {
    this.ingredientId = ingredientId;
    this.name = name;
    this.amount = amount ?? '적당량';
  }
}
