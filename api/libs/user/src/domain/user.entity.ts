import { User as UserType, $Enums } from '@prisma/client';

export class User implements UserType {
  id: number;
  username: string;
  email: string;
  introduction: string;
  diet: $Enums.Diet;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
}
