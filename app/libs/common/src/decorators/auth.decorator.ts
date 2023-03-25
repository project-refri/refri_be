import { RefreshDto } from '@app/auth/dto/token.dto';
import { JwtAuthGuard, JwtRefreshAuthGuard } from '@app/auth/jwt-auth.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UnauthorizedResponse } from '../dto/error-response.dto';

export const Auth = () => {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ type: UnauthorizedResponse }),
  );
};

export const RefreshAuth = () => {
  return applyDecorators(
    UseGuards(JwtRefreshAuthGuard),
    ApiBody({ type: RefreshDto }),
    ApiUnauthorizedResponse({ type: UnauthorizedResponse }),
  );
};
