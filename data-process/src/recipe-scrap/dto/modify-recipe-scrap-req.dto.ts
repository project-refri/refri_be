import { IsEnum, IsInt, IsOptional, IsUrl, Min } from 'class-validator';

export class CreateRecipeScrapRequestDto {
  @IsUrl()
  url: string;
}

export class ConfirmRecipeScrapRequestDto {
  @IsUrl()
  @IsOptional()
  origin_url?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  recipe_id?: number;

  @IsEnum(['confirm', 'reject'])
  confirm: 'confirm' | 'reject';
}
