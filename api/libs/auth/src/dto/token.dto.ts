import { User } from '@app/user/entities/user.entity';
import { IsMongoId, IsUUID } from 'class-validator';

export class LoginSessionDto {
  session_token: string;

  user: User;
}

export class CreateSessionDto {
  @IsUUID()
  session_token: string;

  @IsMongoId()
  user_id: string;
}
