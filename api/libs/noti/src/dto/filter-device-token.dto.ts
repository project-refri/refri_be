import { IsInt } from 'class-validator';

export class FilterDeviceTokenDto {
  @IsInt()
  user_id: number;
}
