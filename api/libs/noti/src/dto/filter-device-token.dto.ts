import { IsInt } from 'class-validator';
import { ApiExpose } from '@app/common/decorators/api-expose.decorator';

export class FilterDeviceTokenDto {
  @ApiExpose({ name: 'user_id' })
  @IsInt()
  userId: number;
}
