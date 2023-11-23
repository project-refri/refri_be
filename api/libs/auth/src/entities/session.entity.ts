import { Session as SessionType } from '@prisma/client';

export class Session implements SessionType {
  id: number;
  session_token: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}
