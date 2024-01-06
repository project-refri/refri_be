import { Inject, Injectable } from '@nestjs/common';
import { Messaging } from 'firebase-admin/messaging';
// import { FCM_MESSAGING } from '../noti.module';
import { CrudService } from '@app/common/crud.service';
import { Noti } from '@app/noti/domain/noti.entity';
import { CreateNotiDto, UpdateNotiDto } from '../dto/modify-noti.dto';
import { NotiRepository } from '../repository/noti.repository';
import { FilterNotiDto } from '../dto/filter-noti.dto';

@Injectable()
export class NotiService extends CrudService<
  Noti,
  CreateNotiDto,
  UpdateNotiDto,
  FilterNotiDto
> {
  constructor(
    private readonly notiRepository: NotiRepository,
    @Inject('FCM_MESSAGING') private readonly fcmMessaging: Messaging,
  ) {
    super(notiRepository);
  }
}
