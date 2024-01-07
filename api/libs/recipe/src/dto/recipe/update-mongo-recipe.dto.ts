import { OmitType, PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';
import { CreateMongoRecipeDto } from './create-mongo-recipe.dto';
import { ApiExpose } from '@app/common/decorators/api-expose.decorator';

export class UpdateMongoRecipeDto extends PartialType(
  OmitType(CreateMongoRecipeDto, ['ownerId'] as const),
) {
  @ApiExpose({ name: 'view_count', isOptional: true })
  @IsOptional()
  @IsInt()
  viewCount?: number;

  @ApiExpose({ name: 'mysql_id', isOptional: true })
  @IsOptional()
  @IsInt()
  mysqlId?: number;
}
