import {
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { ApiExpose } from '@app/common/decorators/api-expose.decorator';

export class UpdateRecipeDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @ApiExpose({ name: 'mongo_id', isOptional: true })
  @IsOptional()
  @IsMongoId()
  mongoId?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @IsUrl()
  @IsOptional()
  @IsString()
  thumbnail?: string;

  @ApiExpose({ name: 'origin_url ', isOptional: true })
  @IsUrl()
  @IsOptional()
  @IsString()
  originUrl?: string;

  @ApiExpose({ name: 'view_count', isOptional: true })
  @IsOptional()
  @IsInt()
  viewCount?: number;
}
