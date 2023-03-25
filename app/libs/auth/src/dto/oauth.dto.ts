import { User } from '@app/user/entities/user.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { LoginTokensDto } from './token.dto';

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

export class OAuthLoginTokenAndUserDto {
  is_exist: boolean;
  token?: LoginTokensDto;
  user?: User;
}
