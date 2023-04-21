import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FilterRecipeDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  owner?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  thumbnail?: string;

  @IsDate()
  @IsOptional()
  created_at?: Date;

  @IsDate()
  @IsOptional()
  updated_at?: Date;
}
