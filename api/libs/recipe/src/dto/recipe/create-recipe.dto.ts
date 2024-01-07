import {
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { ApiExpose } from '@app/common/decorators/api-expose.decorator';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiExpose({ name: 'mongo_id', isOptional: true })
  @IsOptional()
  @IsMongoId()
  mongoId?: string;

  @ApiExpose({ name: 'owner_id', isOptional: true })
  @IsOptional()
  @IsInt()
  ownerId?: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  @IsString()
  thumbnail: string;

  @IsUrl()
  @IsString()
  originUrl: string;

  @ApiExpose({ name: 'view_count', isOptional: true })
  @IsOptional()
  @IsInt()
  viewCount?: number = 0;

  constructor(
    name: string,
    mongoId: string,
    ownerId: number,
    description: string,
    thumbnail: string,
    originUrl: string,
  ) {
    this.name = name;
    this.mongoId = mongoId;
    this.ownerId = ownerId;
    this.description = description;
    this.thumbnail = thumbnail;
    this.originUrl = originUrl;
  }
}
