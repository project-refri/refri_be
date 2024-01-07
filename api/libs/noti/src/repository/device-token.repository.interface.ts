import { DeviceToken as MongoDeviceToken } from '@app/noti/domain/mongo/mongo.device-token.entity';
import { DeviceToken as PrismaDeviceToken } from '@app/noti/domain/device-token.entity';
import { CreateDeviceTokenDto } from '../dto/create-device-token.dto';
import { ICrudRepository } from '@app/common/repository/crud.repository';

type DeviceToken = MongoDeviceToken | PrismaDeviceToken;

export type IDeviceTokenRepository = ICrudRepository<
  DeviceToken,
  CreateDeviceTokenDto,
  any
>;
