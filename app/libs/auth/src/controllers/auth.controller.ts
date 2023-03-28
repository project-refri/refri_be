import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { GoogleLoginDto, KakaoLoginDto } from '../dto/oauth.dto';
import { ApiPostOk } from '@app/common/decorators/http-method.decorator';
import { User } from '@app/user/entities/user.entity';
import { ReqUser } from '@app/common/decorators/req-user.decorator';
import { CreateUserApiDto, CreateUserDto } from '@app/user/dto/modify-user.dto';
import {
  RefreshAuth,
  RegisterAuth,
} from '@app/common/decorators/auth.decorator';
import {
  LogoutResponseDto,
  OAuthLoginResponseDto,
  RefreshResponseDto,
  RegisterResponseDto,
} from '../dto/auth-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * ## Register
   *
   * Create User with given dto and return token, user info.
   * Auth header as Bearer token(OAuthLogin response) is required.
   * `username` is unique.
   */
  @ApiPostOk(RegisterResponseDto)
  @RegisterAuth()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() createUserApiDto: CreateUserApiDto, @Req() req) {
    const email: string = req.user;
    const createUserDto: CreateUserDto = { ...createUserApiDto, email };
    return await this.authService.register(createUserDto);
  }

  /**
   * ## Google Login
   *
   * Login User with given access_token of google.
   * If user is not registered, response's `if_exist` is `false` and `register_token` response.
   * If user is registered, response's `if_exist` is `true` and `token`, `user` response.
   */
  @ApiPostOk(OAuthLoginResponseDto)
  @HttpCode(HttpStatus.OK)
  @Post('google')
  async googleLogin(@Body() googleLoginDto: GoogleLoginDto) {
    return await this.authService.googleLogin(googleLoginDto);
  }

  /**
   * ## Kakao Login
   *
   * Login User with given access_token of kakao.
   * If user is not registered, response's `if_exist` is `false` and `register_token` response.
   * If user is registered, response's `if_exist` is `true` and `token`, `user` response.
   */
  @ApiPostOk(OAuthLoginResponseDto)
  @HttpCode(HttpStatus.OK)
  @Post('kakao')
  async kakaoLogin(@Body() kakaoLoginDto: KakaoLoginDto) {
    return await this.authService.kakaoLogin(kakaoLoginDto);
  }

  /**
   * ## Refresh
   *
   * Refresh with given dto's `refresh_token`.
   * If `refresh_token` is valid and not expired, return new `access_token` & `refresh_token`.
   * If `refresh_token` is invalid or expired, return `401`.
   */
  @RefreshAuth()
  @ApiPostOk(RefreshResponseDto)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@ReqUser() user: User) {
    return await this.authService.refresh(user);
  }

  /**
   * ## Logout
   *
   * Logout with given dto's `refresh_token`.
   * If `refresh_token` is valid and not expired, delete `refresh_token` from db.
   */
  @RefreshAuth()
  @ApiPostOk(LogoutResponseDto)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@ReqUser() user: User) {
    return user;
  }
}
