import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nickname: string;

  @IsString()
  user_id: string;
}
