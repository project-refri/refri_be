import { ApiExpose } from '@app/common/decorators/api-expose.decorator';
import { RecipesItemDto } from '@app/recipe/dto/recipe/recipes-item.dto';

export class RecipeBookmarksItemDto extends RecipesItemDto {
  @ApiExpose({ name: 'recipe_bookmark_id' })
  recipeBookmarkId: number;

  constructor(props: {
    id?: number;
    name?: string;
    thumbnail?: string;
    description?: string;
    viewCount?: number;
    createdAt?: Date;
    updatedAt?: Date;
    recipeBookmarkId?: number;
  }) {
    super(
      props.id,
      props.name,
      props.thumbnail,
      props.description,
      props.viewCount,
      props.createdAt,
      props.updatedAt,
    );
    this.recipeBookmarkId = props.recipeBookmarkId;
  }
}
