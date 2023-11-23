import { Noti as NotiType } from '@prisma/client';

export class Noti implements NotiType {
  id: number;
  user_id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
}
