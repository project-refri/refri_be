import { User } from '@app/user/entities/user.entity';
import { IsInt, IsUUID } from 'class-validator';

export class LoginSessionDto {
  sessionToken: string;

  user: User;
}

export class CreateSessionDto {
  @IsUUID()
  sessionToken: string;

  @IsInt()
  userId: number;
}
