import { Optional } from '@nestjs/common';
import { ApiHideProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateDeviceTokenDto {
  @IsString()
  @IsNotEmpty()
  fcmDeviceToken: string;

  @ApiHideProperty()
  @Optional()
  @IsInt()
  userId: number;
}
