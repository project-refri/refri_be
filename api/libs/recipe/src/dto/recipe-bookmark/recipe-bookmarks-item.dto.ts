import { OmitType } from '@nestjs/swagger';
import { RecipeDto } from '@app/recipe/dto/recipe/recipe.dto';

export class RecipeBookmarksItemDto extends OmitType(RecipeDto, [
  'mongoId',
  'ownerId',
  'owner',
  'originUrl',
]) {
  recipeBookmarkId: number;
}
