import { IsIP, IsMongoId, IsOptional } from 'class-validator';

export class CreateRecipeViewLogDto {
  @IsOptional()
  @IsMongoId()
  user_id?: string;

  @IsOptional()
  @IsIP()
  user_ip?: string;

  @IsMongoId()
  recipe_id: string;
}
