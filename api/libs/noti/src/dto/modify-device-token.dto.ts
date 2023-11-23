import { Optional } from '@nestjs/common';
import { ApiHideProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateDeviceTokenDto {
  @IsString()
  @IsNotEmpty()
  fcm_device_token: string;

  @ApiHideProperty()
  @Optional()
  @IsInt()
  user_id: number;
}
