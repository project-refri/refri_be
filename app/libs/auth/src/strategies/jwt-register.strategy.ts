import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtRefreshPayload } from '../types/jwt-payload.type';

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

  async validate(payload: JwtRefreshPayload) {
    const { sub: email } = payload;
    return email;
  }
}
