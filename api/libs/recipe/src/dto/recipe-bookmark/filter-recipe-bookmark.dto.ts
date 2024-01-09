import { IsInt, IsOptional } from 'class-validator';
import { PagenationDto } from '@app/common/dto/pagenation.dto';
import { ApiHideProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FilterRecipeBookmarkDto extends PagenationDto {
  @ApiHideProperty()
  @Expose({ name: 'user_id' })
  @IsOptional()
  @IsInt()
  userId?: number;

  @ApiHideProperty()
  @Expose({ name: 'recipe_id' })
  @IsOptional()
  @IsInt()
  recipeId?: number;
}
