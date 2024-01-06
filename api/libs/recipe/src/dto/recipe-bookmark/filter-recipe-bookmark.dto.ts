import { IsInt, IsOptional } from 'class-validator';
import {
  PagenationDto,
  PagenationResponseDto,
} from '@app/common/dto/pagenation.dto';
import { ApiHideProperty } from '@nestjs/swagger';
import { Recipe } from '@app/recipe/domain/recipe.entity';

export class FilterRecipeBookmarkDto extends PagenationDto {
  @ApiHideProperty()
  @IsOptional()
  @IsInt()
  userId?: number;
}

export interface IRecipeBookmarkListViewResponseDto
  extends Omit<
    Recipe,
    | 'mongoId'
    | 'ownerId'
    | 'owner'
    | 'recipeRawText'
    | 'originUrl'
    | 'recipeSteps'
    | 'ingredientRequirements'
  > {
  recipeBookmarkId: number;
}

export class RecipeBookmarkListViewResponseDto
  implements IRecipeBookmarkListViewResponseDto
{
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  viewCount: number;
  recipeBookmarkId: number;
  createdAt: Date;
  updatedAt: Date;
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
      hasNext: this.count > (page - 1) * limit + this.recipes.length,
    };
  }
}
