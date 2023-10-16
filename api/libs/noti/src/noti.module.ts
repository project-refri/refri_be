import { Module } from '@nestjs/common';
import { NotiService } from './service/noti.service';
import { credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import { ConfigService } from '@nestjs/config';
import { NotiRepository } from './repository/noti.repository';
import { DeviceTokenRepository } from './repository/device-token.repository';
import { DeviceTokenService } from './service/device-token.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Noti, NotiSchema } from './entity/noti.entity';
import { DeviceToken, DeviceTokenSchema } from './entity/device-token.entity';
import { NotiController } from './controller/noti.controller';

// export const FCM_MESSAGING = Symbol('FCM_MESSAGING');

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Noti.name, schema: NotiSchema },
      { name: DeviceToken.name, schema: DeviceTokenSchema },
    ]),
  ],
  controllers: [NotiController],
  providers: [
    NotiService,
    DeviceTokenService,
    NotiRepository,
    DeviceTokenRepository,
    {
      provide: 'FCM_MESSAGING',
      useFactory: (configService: ConfigService) => {
        initializeApp({
          credential: credential.cert({
            projectId: configService.get('FIREBASE_PROJECT_ID'),
            clientEmail: configService.get('FIREBASE_CLIENT_EMAIL'),
            privateKey: configService
              .get('FIREBASE_PRIVATE_KEY')
              .replace(/\\n/g, '\n'),
          }),
        });
        return getMessaging();
      },
      inject: [ConfigService],
    },
  ],
  exports: [
    NotiService,
    DeviceTokenService,
    NotiRepository,
    DeviceTokenRepository,
  ],
})
export class NotiModule {}
