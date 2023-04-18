import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserInfo } from '../types/user-info.type';
import { JwtRegisterPayload } from '../types/jwt-payload.type';

@Injectable()
export class JwtRegisterStrategy extends PassportStrategy(
  Strategy,
  'jwt-register',
) {
  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtRegisterPayload): Promise<UserInfo> {
    const { sub: email, username } = payload;
    return {
      email,
      username,
    };
  }
}
