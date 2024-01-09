import { ICrudRepository } from '@app/common/repository/crud.repository';
import { CreateNotiDto } from '../dto/create-noti.dto';
import { Noti as MongoNoti } from '@app/noti/domain/mongo/mongo.noti.entity';
import { NotiEntity as PrismaNoti } from '@app/noti/domain/noti.entity';
import { UpdateNotiDto } from '@app/noti/dto/update-noti.dto';

type Noti = MongoNoti | PrismaNoti;

export type INotiRepository = ICrudRepository<
  Noti,
  CreateNotiDto,
  UpdateNotiDto
>;
