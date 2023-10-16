import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CrudMongoRepository } from '@app/common/crud-mongo.repository';
import { Noti, NotiDocument } from '../entity/noti.entity';
import { CreateNotiDto, UpdateNotiDto } from '../dto/modify-noti.dto';

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
