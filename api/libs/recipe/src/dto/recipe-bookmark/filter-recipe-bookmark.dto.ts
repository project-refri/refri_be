import { IsMongoId, IsOptional } from 'class-validator';
import {
  PagenationDto,
  PagenationResponseDto,
} from '@app/common/dto/pagenation.dto';
import { ApiHideProperty, OmitType } from '@nestjs/swagger';
import { Recipe } from '../../entities/recipe.entity';

export class FilterRecipeBookmarkDto extends PagenationDto {
  @ApiHideProperty()
  @IsOptional()
  @IsMongoId()
  user_id?: string;
}

export class RecipeBookmarkListViewResponseDto extends OmitType(Recipe, [
  'recipe_raw_text',
  'origin_url',
  'recipe_steps',
  'ingredient_requirements',
] as const) {
  recipe_bookmark_id: string;
}

export class RecipeBookmarksResponseDto extends PagenationResponseDto {
  results: RecipeBookmarkListViewResponseDto[];
}

export class RecipeBookmarksAndCountDto {
  recipes: RecipeBookmarkListViewResponseDto[];
  count: number;

  constructor(recipes: RecipeBookmarkListViewResponseDto[], count: number) {
    this.recipes = recipes;
    this.count = count;
  }

  toRecipeBookmarksResponseDto(
    page: number,
    limit: number,
  ): RecipeBookmarksResponseDto {
    return {
      results: this.recipes,
      page,
      count: this.recipes.length,
      has_next: this.count > (page - 1) * limit + this.recipes.length,
    };
  }
}
