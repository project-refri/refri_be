import { User } from '@app/user/entities/user.entity';
import { UserService } from '@app/user/services/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from '../repositories/auth.repository';
import { JwtPayload, JwtRefreshPayload } from '../types/jwt-payload.type';
import { v4 as uuid4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '@app/user/dto/modify-user.dto';
import { LoginTokenAndUserDto } from '../dto/token.dto';
import { HttpService } from '@nestjs/axios';
import { GoogleLoginDto, OAuthLoginTokenAndUserDto } from '../dto/oauth.dto';
import {
  GoogleApiResponseType,
  KakaoApiResponseType,
} from '../types/oauth.type';
import { UserInfo } from '../types/user-info.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<LoginTokenAndUserDto> {
    const user = await this.userService.create(createUserDto);
    return await this.login(user);
  }

  async login(user: User): Promise<LoginTokenAndUserDto> {
    const jwtPayload: JwtPayload = {
      sub: user.id.toString(),
    };
    const accessToken = this.jwtService.sign(jwtPayload);
    const uuid = uuid4();
    const jwtRefreshPayload: JwtRefreshPayload = {
      sub: user.id.toString(),
      uuid,
    };
    const refreshToken = this.jwtService.sign(jwtRefreshPayload, {
      expiresIn: parseInt(
        this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
      ),
    });
    await this.authRepository.create({
      refresh_token: refreshToken,
      uuid,
    });
    return {
      token: {
        access_token: accessToken,
        refresh_token: refreshToken,
      },
      user,
    };
  }

  async OAuthLoginByEmail(
    userInfo: UserInfo,
  ): Promise<OAuthLoginTokenAndUserDto> {
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

  async googleLogin(
    googleLoginDto: GoogleLoginDto,
  ): Promise<OAuthLoginTokenAndUserDto> {
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

  async kakaoLogin(
    kakaoLoginDto: GoogleLoginDto,
  ): Promise<OAuthLoginTokenAndUserDto> {
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

  async refresh(user: User): Promise<LoginTokenAndUserDto> {
    return await this.login(user);
  }
}
