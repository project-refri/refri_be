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
import { ApiExpose } from '@app/common/decorators/api-expose.decorator';

export class FilterUserIngredientDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @ApiExpose({ name: 'user_id', isOptional: true })
  @IsString()
  @IsMongoId()
  @IsOptional()
  userId?: number;

  @ApiExpose({ name: 'food_type', isOptional: true })
  @IsEnum(FoodType)
  @IsOptional()
  foodType?: FoodType;

  @ApiExpose({ name: 'store_method', isOptional: true })
  @IsEnum(StoreMethod)
  @IsOptional()
  storeMethod?: StoreMethod;

  @IsNumber()
  @Min(1)
  @Max(1000)
  @IsOptional()
  count?: number;

  @ApiExpose({ name: 'days_before_expiration', isOptional: true })
  @IsNumber()
  @Min(0)
  @Max(365)
  @IsOptional()
  daysBeforeExpiration?: number;
}
