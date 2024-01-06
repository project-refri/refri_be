import { Session as SessionType } from '@prisma/client';

export class Session implements SessionType {
  id: number;
  sessionToken: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}
