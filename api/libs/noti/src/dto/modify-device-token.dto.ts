import { Optional } from '@nestjs/common';
import { ApiHideProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiExpose } from '@app/common/decorators/api-expose.decorator';
import { Expose } from 'class-transformer';

export class CreateDeviceTokenDto {
  @ApiExpose({ name: 'fcm_device_token' })
  @IsString()
  @IsNotEmpty()
  fcmDeviceToken: string;

  @ApiHideProperty()
  @Expose({ name: 'user_id' })
  @Optional()
  @IsInt()
  userId: number;
}
