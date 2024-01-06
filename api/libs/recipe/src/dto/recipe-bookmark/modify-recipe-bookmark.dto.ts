import { ApiHideProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class CreateRecipeBookmarkDto {
  @ApiHideProperty()
  @IsOptional()
  @IsInt()
  userId?: number;

  @IsInt()
  recipeId: number;
}
