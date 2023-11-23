import { DeviceToken as DeviceTokenType } from '@prisma/client';

export class DeviceToken implements DeviceTokenType {
  id: number;
  user_id: number;
  fcm_device_token: string;
  created_at: Date;
  updated_at: Date;
}
