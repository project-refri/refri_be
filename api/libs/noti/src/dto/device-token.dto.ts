import { DeviceToken } from '@app/noti/domain/device-token.entity';
import { ApiExpose } from '@app/common/decorators/api-expose.decorator';

export class DeviceTokenDto {
  public readonly id: number;

  @ApiExpose({ name: 'user_id' })
  public readonly userId: number;

  @ApiExpose({ name: 'fcm_device_token' })
  public readonly fcmDeviceToken: string;

  @ApiExpose({ name: 'created_at' })
  public readonly createdAt: Date;

  @ApiExpose({ name: 'updated_at' })
  public readonly updatedAt: Date;

  constructor(props: {
    id: number;
    userId: number;
    fcmDeviceToken: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = props.id;
    this.userId = props.userId;
    this.fcmDeviceToken = props.fcmDeviceToken;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static from(deviceToken: DeviceToken) {
    return new DeviceTokenDto({
      id: deviceToken.id,
      userId: deviceToken.userId,
      fcmDeviceToken: deviceToken.fcmDeviceToken,
      createdAt: deviceToken.createdAt,
      updatedAt: deviceToken.updatedAt,
    });
  }
}
