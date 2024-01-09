import { PagenationResponseDto } from '@app/common/dto/pagenation.dto';
import { RecipesItemDto } from '@app/recipe/dto/recipe/recipes-item.dto';
import { Type } from 'class-transformer';

export class RecipesResponseDto extends PagenationResponseDto {
  @Type(() => RecipesItemDto)
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
