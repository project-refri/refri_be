import { PagenationResponseDto } from '@app/common/dto/pagenation.dto';
import { RecipeBookmarksItemDto } from '@app/recipe/dto/recipe-bookmark/recipe-bookmarks-item.dto';
import { Type } from 'class-transformer';

export class RecipeBookmarksResponseDto extends PagenationResponseDto {
  @Type(() => RecipeBookmarksItemDto)
  results: RecipeBookmarksItemDto[];

  constructor(
    results: RecipeBookmarksItemDto[],
    page: number,
    count: number,
    hasNext: boolean,
  ) {
    super(page, count, hasNext);
    this.results = results;
  }
}
