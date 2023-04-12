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
import { FoodType } from '../types/food-type.enum';
import { StoreMethod } from '../types/store-method.enum';

export class FilterIngredientDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsMongoId()
  @IsOptional()
  user_id?: string;

  @IsEnum(FoodType)
  @IsOptional()
  food_type?: FoodType;

  @IsEnum(StoreMethod)
  @IsOptional()
  store_method?: StoreMethod;

  @IsNumber()
  @Min(1)
  @Max(1000)
  @IsOptional()
  count?: number;

  @IsNumber()
  @Min(0)
  @Max(365)
  @IsOptional()
  days_before_expiration?: number;
}
