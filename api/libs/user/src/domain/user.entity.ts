import { Diet, User as UserType } from '@prisma/client';

export class User implements UserType {
  id: number;
  username: string;
  email: string;
  introduction: string;
  diet: Diet;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
}
