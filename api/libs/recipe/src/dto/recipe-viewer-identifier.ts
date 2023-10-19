import { User } from '@app/user/entities/user.entity';
import { IsIP, IsInstance } from 'class-validator';

export class RecipeViewerIdentifier {
  constructor(user: User, ip: string) {
    this.user = user;
    this.ip = ip;
  }

  @IsInstance(User)
  user: User;

  @IsIP()
  ip: string;
}
