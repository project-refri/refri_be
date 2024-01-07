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
import { IngredientRequirementDto } from './ingredient-requirement.dto';
import { RecipeStepDto } from './recipe-step.dto';
import { CreateRecipeDto } from './create-recipe.dto';
import { ApiExpose } from '@app/common/decorators/api-expose.decorator';

export class CreateMongoRecipeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiExpose({ name: 'mysql_id', isOptional: true })
  @IsInt()
  @Min(1)
  @IsOptional()
  mysqlId?: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiExpose({ name: 'owner_id', isOptional: true })
  @IsInt()
  @Min(1)
  @IsOptional()
  ownerId?: number;

  @ApiExpose({ name: 'ingredient_requirements' })
  @ValidateNested()
  @ArrayNotEmpty()
  @IsArray()
  ingredientRequirements: IngredientRequirementDto[];

  @ApiExpose({ name: 'recipe_steps' })
  @ValidateNested()
  @ArrayNotEmpty()
  @IsArray()
  recipeSteps: RecipeStepDto[];

  @IsUrl()
  @IsString()
  thumbnail: string;

  @ApiExpose({ name: 'recipe_raw_text' })
  @IsString()
  @IsNotEmpty()
  recipeRawText: string;

  @ApiExpose({ name: 'origin_url' })
  @IsUrl()
  @IsString()
  originUrl: string;

  toCreateRecipeDto(mongoId: string): CreateRecipeDto {
    return new CreateRecipeDto(
      this.name,
      mongoId,
      null,
      this.description,
      this.thumbnail,
      this.originUrl,
    );
  }
}
