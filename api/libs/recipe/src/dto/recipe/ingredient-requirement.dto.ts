import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class IngredientRequirementDto {
  constructor(ingredientId: string, name: string, amount: string) {
    this.ingredientId = ingredientId;
    this.name = name;
    this.amount = amount ?? '적당량';
  }

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
}
