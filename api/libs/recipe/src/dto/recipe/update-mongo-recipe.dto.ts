import { OmitType, PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';
import { CreateMongoRecipeDto } from './create-mongo-recipe.dto';

export class UpdateMongoRecipeDto extends PartialType(
  OmitType(CreateMongoRecipeDto, ['owner'] as const),
) {
  @IsOptional()
  @IsInt()
  viewCount?: number;

  @IsOptional()
  @IsInt()
  mysqlId?: number;
}
