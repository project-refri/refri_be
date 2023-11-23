import { User } from '@app/user/entities/user.entity';
import { IsInt, IsUUID } from 'class-validator';

export class LoginSessionDto {
  session_token: string;

  user: User;
}

export class CreateSessionDto {
  @IsUUID()
  session_token: string;

  @IsInt()
  user_id: number;
}
