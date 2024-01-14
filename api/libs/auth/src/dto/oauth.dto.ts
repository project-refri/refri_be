import { IsNotEmpty, IsString } from 'class-validator';
import { UserDto } from '@app/user/dto/user.dto';
import { ApiExpose } from '@app/common/decorators/api-expose.decorator';
import { Type } from 'class-transformer';

export class GoogleLoginDto {
  @ApiExpose({ name: 'access_token' })
  @IsString()
  @IsNotEmpty()
  readonly accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}

export class KakaoLoginDto {
  @ApiExpose({ name: 'access_token' })
  @IsString()
  @IsNotEmpty()
  readonly accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}

export class OAuthLoginSessionDto {
  @ApiExpose({ name: 'is_exist' })
  readonly isExist: boolean;

  @ApiExpose({ name: 'session_token' })
  readonly sessionToken?: string;

  @Type(() => UserDto)
  @ApiExpose({ name: 'user' })
  readonly user?: UserDto;

  @ApiExpose({ name: 'register_token' })
  readonly registerToken?: string;

  constructor(props: {
    isExist: boolean;
    sessionToken?: string;
    user?: UserDto;
    registerToken?: string;
  }) {
    this.isExist = props.isExist;
    this.sessionToken = props.sessionToken;
    this.user = props.user;
    this.registerToken = props.registerToken;
  }
}
