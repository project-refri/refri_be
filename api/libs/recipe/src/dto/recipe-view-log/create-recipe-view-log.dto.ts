import { IsInt, IsIP, IsOptional } from 'class-validator';
import { ApiExpose } from '@app/common/decorators/api-expose.decorator';

export class CreateRecipeViewLogDto {
  @ApiExpose({ name: 'user_id', isOptional: true })
  @IsOptional()
  @IsInt()
  userId?: number;

  @ApiExpose({ name: 'user_ip' })
  @IsOptional()
  @IsIP()
  userIp: string;

  @ApiExpose({ name: 'recipe_id' })
  @IsInt()
  recipeId: number;
}
