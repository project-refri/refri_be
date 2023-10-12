import { User } from '@app/user/entities/user.entity';
import { UserService } from '@app/user/services/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from '../repositories/auth.repository';
import { CreateUserDto } from '@app/user/dto/modify-user.dto';
import { HttpService } from '@nestjs/axios';
import { GoogleLoginDto, OAuthLoginSessionDto } from '../dto/oauth.dto';
import {
  GoogleApiResponseType,
  KakaoApiResponseType,
} from '../types/oauth.type';
import { UserInfo } from '../types/user-info.type';
import { LoginSessionDto } from '../dto/token.dto';
import { v4 as uuidv4 } from 'uuid';
import { Logable } from '@app/common/log/log.decorator';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  @Logable()
  async register(createUserDto: CreateUserDto): Promise<LoginSessionDto> {
    const user = await this.userService.create(createUserDto);
    return await this.login(user);
  }

  @Logable()
  async verifyRegisterToken(token: string): Promise<UserInfo> {
    const { sub, username } = this.jwtService.verify(token);
    return { email: sub, username };
  }

  @Logable()
  async login(user: User): Promise<LoginSessionDto> {
    const session_token = uuidv4();
    await this.authRepository.create({
      user_id: user.id.toString(),
      session_token,
    });
    return {
      user,
      session_token,
    };
  }

  @Logable()
  async OAuthLoginByEmail(userInfo: UserInfo): Promise<OAuthLoginSessionDto> {
    const { email, username } = userInfo;
    const user = await this.userService.findByEmail(email);
    return {
      is_exist: !!user,
      ...(!!user ? await this.login(user) : {}),
      register_token: !!user
        ? undefined
        : this.jwtService.sign({ sub: email, username }),
    };
  }

  @Logable()
  async googleLogin(
    googleLoginDto: GoogleLoginDto,
  ): Promise<OAuthLoginSessionDto> {
    const { access_token } = googleLoginDto;
    const { data }: { data: GoogleApiResponseType } =
      await this.httpService.axiosRef.get(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
    const { email, name: username } = data;
    return await this.OAuthLoginByEmail({ email, username } as UserInfo);
  }

  @Logable()
  async kakaoLogin(
    kakaoLoginDto: GoogleLoginDto,
  ): Promise<OAuthLoginSessionDto> {
    const { access_token } = kakaoLoginDto;
    const { data }: { data: KakaoApiResponseType } =
      await this.httpService.axiosRef.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    const { email } = data.kakao_account;
    const { nickname: username } = data.kakao_account.profile;
    return await this.OAuthLoginByEmail({ email, username } as UserInfo);
  }

  @Logable()
  async logout(sessionToken: string) {
    await this.authRepository.deleteBySessionToken(sessionToken);
  }
}
