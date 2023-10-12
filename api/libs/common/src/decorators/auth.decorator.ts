import { applyDecorators, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  BadRequestResponse,
  UnauthorizedResponse,
} from '../dto/error-response.dto';
import { RegisterAuthGuard } from '@app/auth/guards/register-auth.guard';
import { SessionAuthGuard } from '@app/auth/guards/session-auth.guard';

export const Auth = () => {
  return applyDecorators(
    UseGuards(SessionAuthGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ type: UnauthorizedResponse }),
  );
};

export const RegisterAuth = () => {
  return applyDecorators(
    UseGuards(RegisterAuthGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ type: UnauthorizedResponse }),
    ApiBadRequestResponse({ type: BadRequestResponse }),
  );
};
