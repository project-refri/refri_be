import { PagenationResponseDto } from '@app/common/dto/pagenation.dto';
import { RecipesItemDto } from '@app/recipe/dto/recipe/recipes-item.dto';

export class RecipesResponseDto extends PagenationResponseDto {
  results: RecipesItemDto[];

  constructor(
    results: RecipesItemDto[],
    page: number,
    count: number,
    hasNext: boolean,
  ) {
    super(page, count, hasNext);
    this.results = results;
  }
}
