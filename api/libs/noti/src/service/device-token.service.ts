import { Injectable } from '@nestjs/common';
import { DeviceTokenRepository } from '../repository/device-token.repository';
import { CreateDeviceTokenDto } from '../dto/modify-device-token.dto';
import { DeviceToken } from '@app/noti/domain/device-token.entity';
import { CrudService } from '@app/common/crud.service';
import { FilterDeviceTokenDto } from '../dto/filter-device-token.dto';

@Injectable()
export class DeviceTokenService extends CrudService<
  DeviceToken,
  CreateDeviceTokenDto,
  any,
  FilterDeviceTokenDto
> {
  constructor(private readonly deviceTokenRepository: DeviceTokenRepository) {
    super(deviceTokenRepository);
  }
}
