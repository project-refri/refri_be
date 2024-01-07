import { OmitType } from '@nestjs/swagger';
import { MongoRecipeDto } from '@app/recipe/dto/recipe/mongo-recipe.dto';

export class RecipeDetailDto extends OmitType(MongoRecipeDto, [
  'recipeRawText',
  'originUrl',
]) {}
