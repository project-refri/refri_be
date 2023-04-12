import { OkResponse } from '@app/common/dto/success-response.dto';
import { User } from '@app/user/entities/user.entity';
import { OAuthLoginTokenAndUserDto } from './oauth.dto';
import { LoginTokenAndUserDto } from './token.dto';

export class RegisterResponseDto extends OkResponse {
  data: LoginTokenAndUserDto;
}

export class OAuthLoginResponseDto extends OkResponse {
  data: OAuthLoginTokenAndUserDto;
}

export class RefreshResponseDto extends OkResponse {
  data: LoginTokenAndUserDto;
}

export class LogoutResponseDto extends OkResponse {
  data: User;
}
