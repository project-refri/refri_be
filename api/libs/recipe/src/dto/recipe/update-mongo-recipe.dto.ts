import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiExpose } from '@app/common/decorators/api-expose.decorator';
import { IngredientRequirementDto } from '@app/recipe/dto/recipe/ingredient-requirement.dto';
import { RecipeStepDto } from '@app/recipe/dto/recipe/recipe-step.dto';

export class UpdateMongoRecipeDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @ApiExpose({ name: 'mysql_id', isOptional: true })
  @IsInt()
  @Min(1)
  @IsOptional()
  mysqlId?: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @ApiExpose({ name: 'owner_id', isOptional: true })
  @IsInt()
  @Min(1)
  @IsOptional()
  ownerId?: number;

  @ApiExpose({ name: 'ingredient_requirements', isOptional: true })
  @ValidateNested()
  @ArrayNotEmpty()
  @IsOptional()
  @IsArray()
  ingredientRequirements?: IngredientRequirementDto[];

  @ApiExpose({ name: 'recipe_steps', isOptional: true })
  @ValidateNested()
  @ArrayNotEmpty()
  @IsOptional()
  @IsArray()
  recipeSteps?: RecipeStepDto[];

  @IsUrl()
  @IsOptional()
  @IsString()
  thumbnail?: string;

  @ApiExpose({ name: 'recipe_raw_text', isOptional: true })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  recipeRawText?: string;

  @ApiExpose({ name: 'origin_url', isOptional: true })
  @IsUrl()
  @IsOptional()
  @IsString()
  originUrl?: string;

  @ApiExpose({ name: 'view_count', isOptional: true })
  @IsOptional()
  @IsInt()
  viewCount?: number;
}
