import { ApiHideProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { IngredientRequirement, RecipeStep } from '../entities/recipe.entity';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsMongoId()
  @IsString()
  @IsOptional()
  @ApiHideProperty()
  owner: string;

  @ArrayNotEmpty()
  @IsArray()
  ingredient_requirements: IngredientRequirement[];

  @ArrayNotEmpty()
  @IsArray()
  recipe_steps: RecipeStep[];

  @IsUrl()
  @IsString()
  thumbnail: string;
}

export class UpdateRecipeDto extends PartialType(
  OmitType(CreateRecipeDto, ['owner'] as const),
) {}
