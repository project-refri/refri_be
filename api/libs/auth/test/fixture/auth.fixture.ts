import { SessionEntity } from '@app/auth/domain/session.entity';
import { UserInfo } from '@app/auth/types/user-info.type';
import { LoginSessionDto } from '@app/auth/dto/token.dto';
import {
  GoogleLoginDto,
  KakaoLoginDto,
  OAuthLoginSessionDto,
} from '@app/auth/dto/oauth.dto';
import { userDto, userEntity } from '../../../user/test/fixture/user.fixture';

export const sessionEntity: SessionEntity = {
  id: 1,
  sessionToken: 'token',
  userId: 1,
  user: userEntity,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const userInfo: UserInfo = {
  email: 'test@test.com',
  username: 'test',
};

export const loginSessionDto: LoginSessionDto = {
  sessionToken: 'sessToken',
  user: userDto,
};

export const googleLoginDto: GoogleLoginDto = new GoogleLoginDto('accessToken');

export const kakaoLoginDto: KakaoLoginDto = new KakaoLoginDto('accessToken');

export const oAuthLoginSessionDto: OAuthLoginSessionDto =
  new OAuthLoginSessionDto({
    isExist: true,
    sessionToken: loginSessionDto.sessionToken,
    user: loginSessionDto.user,
  });
