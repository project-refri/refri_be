import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateDeviceTokenDto {
  @IsString()
  @IsNotEmpty()
  fcm_device_token: string;

  @IsMongoId()
  user_id: string;
}
