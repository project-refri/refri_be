import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { FoodType } from '../domain/food-type.enum';
import { StoreMethod } from '../domain/store-method.enum';

export class FilterUserIngredientDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsMongoId()
  @IsOptional()
  userId?: string;

  @IsEnum(FoodType)
  @IsOptional()
  foodType?: FoodType;

  @IsEnum(StoreMethod)
  @IsOptional()
  storeMethod?: StoreMethod;

  @IsNumber()
  @Min(1)
  @Max(1000)
  @IsOptional()
  count?: number;

  @IsNumber()
  @Min(0)
  @Max(365)
  @IsOptional()
  daysBeforeExpiration?: number;
}
