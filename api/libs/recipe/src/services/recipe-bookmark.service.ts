import { CrudService } from '@app/common/crud.service';
import { FilterRecipeBookmarkDto } from '../dto/recipe-bookmark/filter-recipe-bookmark.dto';
import { CreateRecipeBookmarkDto } from '../dto/recipe-bookmark/modify-recipe-bookmark.dto';
import { RecipeBookmarkRepository } from '../repositories/recipe-bookmark/recipe-bookmark.repository';
import { Injectable } from '@nestjs/common';
import { RecipeBookmark } from '../entities/recipe-bookmark.entity';
import { RecipesResponseDto } from '../dto/recipe/filter-recipe.dto';
import { Logable } from '@app/common/log/log.decorator';

@Injectable()
export class RecipeBookmarkService extends CrudService<
  RecipeBookmark,
  CreateRecipeBookmarkDto,
  any,
  FilterRecipeBookmarkDto
> {
  constructor(
    private readonly recipeBookmarkRespository: RecipeBookmarkRepository,
  ) {
    super(recipeBookmarkRespository);
  }

  @Logable()
  async findAllRecipeBookmarked(
    filterRecipeBookmarkDto: FilterRecipeBookmarkDto,
  ): Promise<RecipesResponseDto> {
    const { page, limit } = filterRecipeBookmarkDto;
    return (
      await this.recipeBookmarkRespository.findAllRecipeBookmarked(
        filterRecipeBookmarkDto,
      )
    ).toRecipeBookmarksResponseDto(page, limit);
  }
}
