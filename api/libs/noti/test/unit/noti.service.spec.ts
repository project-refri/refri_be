import { TestBed } from '@automock/jest';
import { NotiService } from '@app/noti/service/noti.service';
import { NotiRepository } from '@app/noti/repository/noti.repository';
import { Messaging } from 'firebase-admin/messaging';

describe('NotiService Test', () => {
  let service: NotiService;
  let notiRepository: jest.Mocked<NotiRepository>;
  let fcmMessaging: jest.Mocked<Messaging>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(NotiService).compile();

    service = unit;
    notiRepository = unitRef.get(NotiRepository);
    fcmMessaging = unitRef.get<Messaging>('FCM_MESSAGING');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
