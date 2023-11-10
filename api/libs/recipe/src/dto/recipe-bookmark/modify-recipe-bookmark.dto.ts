import { ApiHideProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';

export class CreateRecipeBookmarkDto {
  @ApiHideProperty()
  @IsOptional()
  @IsMongoId()
  user_id?: string;

  @IsMongoId()
  recipe_id: string;
}
