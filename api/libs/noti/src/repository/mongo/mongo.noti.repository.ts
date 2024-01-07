import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CrudMongoRepository } from '@app/common/repository/crud-mongo.repository';
import { Noti, NotiDocument } from '@app/noti/domain/mongo/mongo.noti.entity';
import { CreateNotiDto } from '../../dto/create-noti.dto';
import { UpdateNotiDto } from '@app/noti/dto/update-noti.dto';

@Injectable()
export class NotiRepository extends CrudMongoRepository<
  Noti,
  CreateNotiDto,
  UpdateNotiDto
> {
  constructor(
    @InjectModel(Noti.name)
    private readonly notiModel: Model<NotiDocument>,
  ) {
    super(notiModel);
  }
}
