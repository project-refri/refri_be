import {
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateRecipeDto {
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

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsMongoId()
  mongoId?: string;

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

  @IsOptional()
  @IsInt()
  viewCount?: number = 0;
}
