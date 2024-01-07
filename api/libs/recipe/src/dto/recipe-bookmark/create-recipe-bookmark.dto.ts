import { ApiHideProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiExpose } from '@app/common/decorators/api-expose.decorator';

export class CreateRecipeBookmarkDto {
  @ApiHideProperty()
  @Expose({ name: 'user_id' })
  @IsOptional()
  @IsInt()
  userId: number;

  @ApiExpose({ name: 'recipe_id' })
  @IsInt()
  recipeId: number;
}
