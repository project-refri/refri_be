import { ApiHideProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class CreateRecipeBookmarkDto {
  @ApiHideProperty()
  @IsOptional()
  @IsInt()
  user_id?: number;

  @IsInt()
  recipe_id: number;
}
