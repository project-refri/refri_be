import { OmitType } from '@nestjs/swagger';
import { CreateRecipeDto } from 'src/recipe/dto/modify-recipe.dto';

export class RecipeStructuredDto extends OmitType(CreateRecipeDto, [
  'origin_url',
  'owner',
] as const) {}
