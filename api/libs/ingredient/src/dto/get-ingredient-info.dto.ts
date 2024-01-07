import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ApiExpose } from '@app/common/decorators/api-expose.decorator';

export class GetIngredientInfoDto {
  @ApiExpose({ name: 'image_url' })
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;
}
