import { OmitType } from '@nestjs/mapped-types';
import { CreateRecipeDto } from 'src/recipe/dto/modify-recipe.dto';

export class RecipeStructuredDto extends OmitType(CreateRecipeDto, [
  'origin_url',
  'owner',
] as const) {}
