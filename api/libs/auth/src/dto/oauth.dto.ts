import { User } from '@app/user/domain/user.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class GoogleLoginDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}

export class KakaoLoginDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}

export class OAuthLoginSessionDto {
  isExist: boolean;
  sessionToken?: string;
  user?: User;
  registerToken?: string;
}
