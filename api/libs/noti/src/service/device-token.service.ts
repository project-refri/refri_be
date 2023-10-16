import { Injectable } from '@nestjs/common';
import { DeviceTokenRepository } from '../repository/device-token.repository';
import { CreateDeviceTokenDto } from '../dto/modify-device-token.dto';
import { DeviceToken } from '../entity/device-token.entity';
import { CrudService } from '@app/common/crud.service';

@Injectable()
export class DeviceTokenService extends CrudService<
  DeviceToken,
  CreateDeviceTokenDto,
  any
> {
  constructor(private readonly deviceTokenRepository: DeviceTokenRepository) {
    super(deviceTokenRepository);
  }
}
