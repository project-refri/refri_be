import { IsIP, IsInt, IsOptional } from 'class-validator';

export class CreateRecipeViewLogDto {
  @IsOptional()
  @IsInt()
  user_id?: number;

  @IsOptional()
  @IsIP()
  user_ip: string;

  @IsInt()
  recipe_id: number;
}
