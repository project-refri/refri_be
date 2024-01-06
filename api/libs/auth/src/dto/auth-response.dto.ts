import { OkResponse } from '@app/common/dto/success-response.dto';
import { User } from '@app/user/domain/user.entity';
import { LoginSessionDto } from './token.dto';
import { OAuthLoginSessionDto } from './oauth.dto';

export class RegisterResponseDto extends OkResponse {
  data: LoginSessionDto;
}

export class OAuthLoginResponseDto extends OkResponse {
  data: OAuthLoginSessionDto;
}

export class LogoutResponseDto extends OkResponse {
  data: User;
}
