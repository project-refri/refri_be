import { RecipeDto } from '@app/recipe/dto/recipe/recipe.dto';
import { UserDto } from '@app/user/dto/user.dto';
import { ApiExpose } from '@app/common/decorators/api-expose.decorator';
import { RecipeBookmarkEntity } from '@app/recipe/domain/recipe-bookmark.entity';
import { Transform } from 'class-transformer';

export class RecipeBookmarkDto {
  id: number;

  @ApiExpose({ name: 'recipe_id' })
  recipeId: number;

  recipe?: RecipeDto;

  @ApiExpose({ name: 'user_id' })
  userId: number;

  user?: UserDto;

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @Transform(({ value }) => value.toISOString(), { toPlainOnly: true })
  @ApiExpose({ name: 'created_at' })
  createdAt: Date;

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @Transform(({ value }) => value.toISOString(), { toPlainOnly: true })
  @ApiExpose({ name: 'updated_at' })
  updatedAt: Date;

  constructor(props: {
    id: number;
    recipeId: number;
    recipe?: RecipeDto;
    userId: number;
    user?: UserDto;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = props.id;
    this.recipeId = props.recipeId;
    this.recipe = props.recipe;
    this.userId = props.userId;
    this.user = props.user;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static fromEntity(recipeBookmark: RecipeBookmarkEntity) {
    return new RecipeBookmarkDto({
      id: recipeBookmark.id,
      recipeId: recipeBookmark.recipeId,
      recipe: recipeBookmark.recipe
        ? RecipeDto.fromEntity(recipeBookmark.recipe)
        : undefined,
      userId: recipeBookmark.userId,
      user: recipeBookmark.user
        ? UserDto.fromEntity(recipeBookmark.user)
        : undefined,
      createdAt: recipeBookmark.createdAt,
      updatedAt: recipeBookmark.updatedAt,
    });
  }
}
