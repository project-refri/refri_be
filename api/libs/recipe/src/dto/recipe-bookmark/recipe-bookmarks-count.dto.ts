import { RecipeBookmarksItemDto } from '@app/recipe/dto/recipe-bookmark/recipe-bookmarks-item.dto';
import { RecipeBookmarksResponseDto } from '@app/recipe/dto/recipe-bookmark/recipe-bookmarks-response.dto';
import { Type } from 'class-transformer';

export class RecipeBookmarksAndCountDto {
  @Type(() => RecipeBookmarksItemDto)
  recipes: RecipeBookmarksItemDto[];

  count: number;

  constructor(recipes: RecipeBookmarksItemDto[], count: number) {
    this.recipes = recipes;
    this.count = count;
  }

  toRecipeBookmarksResponseDto(
    page: number,
    limit: number,
  ): RecipeBookmarksResponseDto {
    return new RecipeBookmarksResponseDto(
      this.recipes,
      page,
      this.recipes.length,
      this.count > (page - 1) * limit + this.recipes.length,
    );
  }
}
