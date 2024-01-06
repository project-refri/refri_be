import { CreatedResponse } from '@app/common/dto/success-response.dto';
import { DeviceToken } from '@app/noti/domain/device-token.entity';

export class CreateDeviceTokenResponseDto extends CreatedResponse {
  data: DeviceToken;
}

export class UpdateDeviceTokenResponseDto extends CreatedResponse {
  data: DeviceToken;
}
