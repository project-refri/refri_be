import { Noti as NotiType } from '@prisma/client';

export class Noti implements NotiType {
  id: number;
  userId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
