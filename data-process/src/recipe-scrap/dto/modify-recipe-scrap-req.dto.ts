import { IsUrl } from 'class-validator';

export class CreateRecipeScrapRequestDto {
  @IsUrl()
  url: string;
}
