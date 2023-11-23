import { ICrudRepository } from '@app/common/repository/crud.repository';
import { FilterNotiDto } from '../dto/filter-noti.dto';
import { CreateNotiDto, UpdateNotiDto } from '../dto/modify-noti.dto';
import { Noti as MongoNoti } from '../entity/mongo/mongo.noti.entity';
import { Noti as PrismaNoti } from '../entity/noti.entity';

type Noti = MongoNoti | PrismaNoti;

export type INotiRepository = ICrudRepository<
  Noti,
  CreateNotiDto,
  UpdateNotiDto,
  FilterNotiDto
>;
