import { CreatedResponse } from '@app/common/dto/success-response.dto';
import { DeviceTokenDto } from '@app/noti/dto/device-token.dto';

export class CreateDeviceTokenResponseDto extends CreatedResponse {
  data: DeviceTokenDto;
}

export class UpdateDeviceTokenResponseDto extends CreatedResponse {
  data: DeviceTokenDto;
}
