import { IsEnum, IsMongoId, IsOptional, IsUrl } from 'class-validator';

export class CreateRecipeScrapRequestDto {
  @IsUrl()
  url: string;
}

export class ConfirmRecipeScrapRequestDto {
  @IsUrl()
  @IsOptional()
  origin_url?: string;

  @IsMongoId()
  @IsOptional()
  recipe_id?: string;

  @IsEnum(['confirm', 'reject'])
  confirm: 'confirm' | 'reject';
}
