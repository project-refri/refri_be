import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateRecipeDto } from './create-recipe.dto';
import { IsDate, IsInt, IsMongoId, IsOptional } from 'class-validator';
import { ApiExpose } from '@app/common/decorators/api-expose.decorator';

export class UpdateRecipeDto extends PartialType(
  OmitType(CreateRecipeDto, ['ownerId'] as const),
) {
  @ApiExpose({ name: 'view_count', isOptional: true })
  @IsOptional()
  @IsInt()
  viewCount?: number;

  @ApiExpose({ name: 'mongo_id', isOptional: true })
  @IsOptional()
  @IsMongoId()
  mongoId?: string;

  @ApiExpose({ name: 'created_at', isOptional: true })
  @IsOptional()
  @IsDate()
  createdAt?: Date;
}
