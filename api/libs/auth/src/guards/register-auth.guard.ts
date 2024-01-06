import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { UserService } from '@app/user/user.service';

@Injectable()
export class RegisterAuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const registerToken = this.extractTokenFromHeader(request);
    if (!registerToken) {
      throw new UnauthorizedException();
    }
    try {
      const userInfo = await this.authService.verifyRegisterToken(
        registerToken,
      );
      const user = await this.userService.findByEmail(userInfo.email);
      if (user) {
        throw new BadRequestException();
      }
      request['user'] = userInfo;
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
