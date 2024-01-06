import { CrudPrismaRepository } from '@app/common/repository/crud-prisma.repository';
import { Injectable } from '@nestjs/common';
import { DeviceToken } from '@app/noti/domain/device-token.entity';
import { CreateDeviceTokenDto } from '../dto/modify-device-token.dto';
import { FilterDeviceTokenDto } from '../dto/filter-device-token.dto';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { IDeviceTokenRepository } from './device-token.repository.interface';

@Injectable()
export class DeviceTokenRepository
  extends CrudPrismaRepository<
    DeviceToken,
    CreateDeviceTokenDto,
    any,
    FilterDeviceTokenDto
  >
  implements IDeviceTokenRepository
{
  constructor(private readonly prisma: PrismaService) {
    super(prisma, 'deviceToken');
  }
}
