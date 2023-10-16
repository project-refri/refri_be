import { IsMongoId } from 'class-validator';

export class FilterDeviceTokenDto {
  @IsMongoId()
  user_id: string;
}
