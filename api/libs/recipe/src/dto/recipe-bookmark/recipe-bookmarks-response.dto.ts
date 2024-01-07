import { PagenationResponseDto } from '@app/common/dto/pagenation.dto';
import { RecipeBookmarksItemDto } from '@app/recipe/dto/recipe-bookmark/recipe-bookmarks-item.dto';

export class RecipeBookmarksResponseDto extends PagenationResponseDto {
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
