import { Optional } from '@nestjs/common';
import { ApiHideProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateDeviceTokenDto {
  @IsString()
  @IsNotEmpty()
  fcm_device_token: string;

  @ApiHideProperty()
  @Optional()
  @IsMongoId()
  user_id: string;
}
