import { UserEntity } from '@app/user/domain/user.entity';
import { IsIP } from 'class-validator';

export class RecipeViewerIdentifier {
  user: UserEntity;
  @IsIP()
  ip: string;

  constructor(user: UserEntity, ip: string) {
    this.user = user;
    this.ip = ip;
  }
}
