import { ApiHideProperty, PartialType } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { FoodType } from '../domain/food-type.enum';
import { StoreMethod } from '../domain/store-method.enum';

export class CreateUserIngredientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsMongoId()
  @IsNotEmpty()
  @IsOptional()
  ingredientId?: string;

  @IsMongoId()
  @IsNotEmpty()
  @IsOptional()
  @ApiHideProperty()
  userId?: string;

  @IsEnum(FoodType)
  foodType: FoodType;

  @IsEnum(StoreMethod)
  storeMethod: StoreMethod;

  @IsNumber()
  @Min(1)
  @Max(1000)
  count: number;

  @IsNumber()
  @Min(0)
  @Max(365)
  daysBeforeExpiration: number;
}

export class UpdateUserIngredientDto extends PartialType(
  CreateUserIngredientDto,
) {}

export class GetIngredientInfoDto {
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;
}
