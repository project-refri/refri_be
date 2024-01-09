import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

class ErrorResponse {
  success = false;
  timestamp = new Date().toISOString();
  path = '/path/of/the/route/handler';
}

export class UnauthorizedResponse extends ErrorResponse {
  error = {
    name: UnauthorizedException.name,
    message: 'Unauthorized',
  };
}

export class BadRequestResponse extends ErrorResponse {
  error = {
    name: BadRequestException.name,
    message: 'Bad Request',
  };
}

export class NotFoundResponse extends ErrorResponse {
  error = {
    name: NotFoundException.name,
    message: 'Not Found',
  };
}

export class ForbiddenResponse extends ErrorResponse {
  error = {
    name: ForbiddenException.name,
    message: 'Forbidden',
  };
}

export class ConflictResponse extends ErrorResponse {
  error = {
    name: ConflictException.name,
    message: 'Conflict',
  };
}
