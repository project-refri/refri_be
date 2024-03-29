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
import { Noti, NotiSchema } from '@app/noti/domain/mongo/mongo.noti.entity';
import {
  DeviceToken,
  DeviceTokenSchema,
} from '@app/noti/domain/mongo/mongo.device-token.entity';
import { NotiController } from './noti.controller';

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
  exports: [NotiService, DeviceTokenService],
})
export class NotiModule {}
