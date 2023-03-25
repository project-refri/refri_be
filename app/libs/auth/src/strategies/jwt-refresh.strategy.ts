import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '@app/user/repositories/user.repository';
import { JwtRefreshPayload } from '../types/jwt-payload.type';
import { AuthRepository } from '../repositories/auth.repository';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authRepository: AuthRepository,
    readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtRefreshPayload) {
    const { sub: userId, uuid } = payload;
    const [user, refreshToken] = await Promise.all([
      this.userRepository.findOne(userId),
      this.authRepository.deleteByUUID(uuid),
    ]);
    if (!user && !refreshToken) {
      throw new UnauthorizedException('token not valid');
    }
    return user;
  }
}
