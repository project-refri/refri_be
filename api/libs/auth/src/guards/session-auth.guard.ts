import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthRepository } from '../repositories/auth.repository';

@Injectable()
export class SessionAuthGuard implements CanActivate {
  constructor(private readonly authRepository: AuthRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const sessionToken = this.extractTokenFromHeader(request);
    if (!sessionToken) {
      throw new UnauthorizedException();
    }
    try {
      const session = await this.authRepository.findBySessionToken(
        sessionToken,
      );
      request['user'] = session.user;
      request['sessionToken'] = session.session_token;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
