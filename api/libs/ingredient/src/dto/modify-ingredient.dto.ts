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
import { FoodType } from '../types/food-type.enum';
import { StoreMethod } from '../types/store-method.enum';

export class CreateUserIngredientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsMongoId()
  @IsNotEmpty()
  @IsOptional()
  ingredient_id?: string;

  @IsMongoId()
  @IsNotEmpty()
  @IsOptional()
  @ApiHideProperty()
  user_id?: string;

  @IsEnum(FoodType)
  food_type: FoodType;

  @IsEnum(StoreMethod)
  store_method: StoreMethod;

  @IsNumber()
  @Min(1)
  @Max(1000)
  count: number;

  @IsNumber()
  @Min(0)
  @Max(365)
  days_before_expiration: number;
}

export class UpdateUserIngredientDto extends PartialType(
  CreateUserIngredientDto,
) {}

export class GetIngredientInfoDto {
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  image_url: string;
}
