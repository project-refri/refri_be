import { IsInt, IsOptional } from 'class-validator';
import {
  PagenationDto,
  PagenationResponseDto,
} from '@app/common/dto/pagenation.dto';
import { ApiHideProperty } from '@nestjs/swagger';
import { Recipe } from '../../entities/recipe.entity';

export class FilterRecipeBookmarkDto extends PagenationDto {
  @ApiHideProperty()
  @IsOptional()
  @IsInt()
  user_id?: number;
}

export interface IRecipeBookmarkListViewResponseDto
  extends Omit<
    Recipe,
    | 'mongo_id'
    | 'owner_id'
    | 'recipe_raw_text'
    | 'origin_url'
    | 'recipe_steps'
    | 'ingredient_requirements'
  > {
  recipe_bookmark_id: number;
}

export class RecipeBookmarkListViewResponseDto
  implements IRecipeBookmarkListViewResponseDto
{
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  view_count: number;
  recipe_bookmark_id: number;
  created_at: Date;
  updated_at: Date;
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
