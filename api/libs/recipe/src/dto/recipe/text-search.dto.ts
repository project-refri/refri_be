import { PagenationDto } from '@app/common/dto/pagenation.dto';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum TextSearchSortBy {
  RELEVANCE = 'RELEVANCE',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
}

export class TextSearchRecipeDto extends PagenationDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  searchQuery?: string;

  @IsEnum(TextSearchSortBy)
  @IsOptional()
  sort?: TextSearchSortBy;
}
