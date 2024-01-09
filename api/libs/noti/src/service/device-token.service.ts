import { Injectable } from '@nestjs/common';
import { DeviceTokenRepository } from '../repository/device-token.repository';
import { CreateDeviceTokenDto } from '../dto/create-device-token.dto';
import { DeviceTokenEntity } from '@app/noti/domain/device-token.entity';
import { CrudService } from '@app/common/crud.service';

@Injectable()
export class DeviceTokenService extends CrudService<
  DeviceTokenEntity,
  CreateDeviceTokenDto,
  any
> {
  constructor(private readonly deviceTokenRepository: DeviceTokenRepository) {
    super(deviceTokenRepository);
  }
}
