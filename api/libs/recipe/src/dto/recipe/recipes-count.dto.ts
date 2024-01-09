import { RecipesItemDto } from '@app/recipe/dto/recipe/recipes-item.dto';
import { RecipesResponseDto } from '@app/recipe/dto/recipe/recipes-response.dto';
import { Type } from 'class-transformer';

export class RecipesAndCountDto {
  @Type(() => RecipesItemDto)
  recipes: RecipesItemDto[];

  count: number;

  constructor(recipes: RecipesItemDto[], count: number) {
    this.recipes = recipes;
    this.count = count;
  }

  toRecipesResponseDto(page: number, limit: number): RecipesResponseDto {
    return new RecipesResponseDto(
      this.recipes,
      page,
      this.recipes.length,
      this.count > (page - 1) * limit + this.recipes.length,
    );
  }
}
