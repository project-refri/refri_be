import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsMongoId,
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

export class CreateMongoRecipeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  mysqlId?: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsMongoId()
  @IsString()
  @IsOptional()
  owner: string;

  @ValidateNested()
  @ArrayNotEmpty()
  @IsArray()
  ingredientRequirements: IngredientRequirementDto[];

  @ValidateNested()
  @ArrayNotEmpty()
  @IsArray()
  recipeSteps: RecipeStepDto[];

  @IsUrl()
  @IsString()
  thumbnail: string;

  @IsString()
  @IsNotEmpty()
  recipeRawText: string;

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
