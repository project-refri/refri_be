import { OmitType } from '@nestjs/swagger';
import { CreateMongoRecipeDto } from 'src/recipe-scrap/dto/create-recipe.dto';

export class RecipeStructuredDto extends OmitType(CreateMongoRecipeDto, [
  'origin_url',
  'owner',
] as const) {}
