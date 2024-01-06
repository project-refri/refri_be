import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateRecipeDto } from './create-recipe.dto';
import { IsDate, IsInt, IsMongoId, IsOptional } from 'class-validator';

export class UpdateRecipeDto extends PartialType(
  OmitType(CreateRecipeDto, ['ownerId'] as const),
) {
  @IsOptional()
  @IsInt()
  viewCount?: number;

  @IsOptional()
  @IsMongoId()
  mongoId?: string;

  @IsOptional()
  @IsDate()
  createdAt?: Date;
}
