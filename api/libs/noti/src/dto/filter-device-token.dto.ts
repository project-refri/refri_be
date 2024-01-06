import { IsInt } from 'class-validator';

export class FilterDeviceTokenDto {
  @IsInt()
  userId: number;
}
