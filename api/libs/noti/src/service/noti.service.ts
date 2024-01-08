import { Inject, Injectable } from '@nestjs/common';
import { Messaging } from 'firebase-admin/messaging';
import { CrudService } from '@app/common/crud.service';
import { Noti } from '@app/noti/domain/noti.entity';
import { CreateNotiDto } from '../dto/create-noti.dto';
import { NotiRepository } from '../repository/noti.repository';
import { UpdateNotiDto } from '@app/noti/dto/update-noti.dto';

@Injectable()
export class NotiService extends CrudService<
  Noti,
  CreateNotiDto,
  UpdateNotiDto
> {
  constructor(
    private readonly notiRepository: NotiRepository,
    @Inject('FCM_MESSAGING') private readonly fcmMessaging: Messaging,
  ) {
    super(notiRepository);
  }
}
