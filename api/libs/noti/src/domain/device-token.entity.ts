import { DeviceToken as DeviceTokenType } from '@prisma/client';

export class DeviceToken implements DeviceTokenType {
  id: number;
  userId: number;
  fcmDeviceToken: string;
  createdAt: Date;
  updatedAt: Date;
}
