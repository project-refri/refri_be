import { User } from '@app/user/domain/user.entity';
import { IsIP } from 'class-validator';

export class RecipeViewerIdentifier {
  user: User;
  @IsIP()
  ip: string;

  constructor(user: User, ip: string) {
    this.user = user;
    this.ip = ip;
  }
}
