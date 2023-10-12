import { User } from '@app/user/entities/user.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class GoogleLoginDto {
  @IsString()
  @IsNotEmpty()
  access_token: string;
}

export class KakaoLoginDto {
  @IsString()
  @IsNotEmpty()
  access_token: string;
}

export class OAuthLoginSessionDto {
  is_exist: boolean;
  session_token?: string;
  user?: User;
  register_token?: string;
}
