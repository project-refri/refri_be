import { ApiExpose } from '@app/common/decorators/api-expose.decorator';

class ErrorResponse {
  success = false;
  timestamp = new Date().toISOString();
  path = '/path/of/the/route/handler';
}

export class UnauthorizedResponse extends ErrorResponse {
  error = 'Unauthorized';
  @ApiExpose({ name: 'status_code' })
  statusCode = 401;
}

export class BadRequestResponse extends ErrorResponse {
  error = 'Bad Request';
  @ApiExpose({ name: 'status_code' })
  statusCode = 400;
}

export class NotFoundResponse extends ErrorResponse {
  error = 'Not Found';
  @ApiExpose({ name: 'status_code' })
  statusCode = 404;
}

export class ForbiddenResponse extends ErrorResponse {
  error = 'Forbidden';
  @ApiExpose({ name: 'status_code' })
  statusCode = 403;
}

export class ConflictResponse extends ErrorResponse {
  error = 'Conflict';
  @ApiExpose({ name: 'status_code' })
  statusCode = 409;
}
