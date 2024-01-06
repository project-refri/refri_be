import { IsIP, IsInt, IsOptional } from 'class-validator';

export class CreateRecipeViewLogDto {
  @IsOptional()
  @IsInt()
  userId?: number;

  @IsOptional()
  @IsIP()
  userIp: string;

  @IsInt()
  recipeId: number;
}
