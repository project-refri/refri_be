import { Injectable } from '@nestjs/common';
import {
  DeviceToken,
  DeviceTokenDocument,
} from '@app/noti/domain/mongo/mongo.device-token.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CrudMongoRepository } from '@app/common/repository/crud-mongo.repository';
import { CreateDeviceTokenDto } from '../../dto/modify-device-token.dto';
import { FilterDeviceTokenDto } from '../../dto/filter-device-token.dto';

@Injectable()
export class DeviceTokenRepository extends CrudMongoRepository<
  DeviceToken,
  CreateDeviceTokenDto,
  any,
  FilterDeviceTokenDto
> {
  constructor(
    @InjectModel(DeviceToken.name)
    private readonly deviceTokenModel: Model<DeviceTokenDocument>,
  ) {
    super(deviceTokenModel);
  }
}
