import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { IngredientRequirementDto } from './ingredient-requirement.dto';

export class RecipeStepDto {
  constructor(
    description: string,
    images: string[],
    ingredients: IngredientRequirementDto[],
  ) {
    this.description = description;
    this.images = images;
    this.ingredients =
      ingredients?.map(
        (item) =>
          new IngredientRequirementDto(
            item.ingredientId,
            item.name,
            item.amount,
          ),
      ) ?? [];
  }
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsUrl(
    {},
    {
      each: true,
    },
  )
  images: string[];

  @ValidateNested()
  @IsArray()
  ingredients: IngredientRequirementDto[];
}
