import { ApiHideProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
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

export class CreateUserIngredientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiExpose({ name: 'ingredient_id', isOptional: true })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @IsOptional()
  ingredientId: number;

  @ApiExpose({ name: 'user_id', isOptional: true })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @IsOptional()
  @ApiHideProperty()
  userId: number;

  @ApiExpose({ name: 'food_type' })
  @IsEnum(FoodType)
  foodType: FoodType;

  @ApiExpose({ name: 'store_method' })
  @IsEnum(StoreMethod)
  storeMethod: StoreMethod;

  @IsNumber()
  @Min(1)
  @Max(1000)
  count: number;

  @ApiExpose({ name: 'days_before_expiration' })
  @IsNumber()
  @Min(0)
  @Max(365)
  daysBeforeExpiration: number;

  @ApiHideProperty()
  @IsString()
  @IsNotEmpty()
  icon: string;
}
