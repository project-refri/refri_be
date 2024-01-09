import { ApiExpose } from '@app/common/decorators/api-expose.decorator';
import { RecipesItemDto } from '@app/recipe/dto/recipe/recipes-item.dto';

export class RecipeBookmarksItemDto extends RecipesItemDto {
  @ApiExpose({ name: 'recipe_bookmark_id' })
  recipeBookmarkId: number;
}
