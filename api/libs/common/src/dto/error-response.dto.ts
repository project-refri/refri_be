export type ErrorResponseType = {
  success: boolean;
  error: object;
  statusCode: number;
  timestamp: string;
  path: string;
};

class ErrorResponse {
  success = false;
  timestamp = new Date().toISOString();
  path = '/path/of/the/route/handler';
}

export class UnauthorizedResponse extends ErrorResponse {
  error = 'Unauthorized';
  statusCode = 401;
}

export class BadRequestResponse extends ErrorResponse {
  error = 'Bad Request';
  statusCode = 400;
}

export class NotFoundResponse extends ErrorResponse {
  error = 'Not Found';
  statusCode = 404;
}

export class ForbiddenResponse extends ErrorResponse {
  error = 'Forbidden';
  statusCode = 403;
}

export class ConflictResponse extends ErrorResponse {
  error = 'Conflict';
  statusCode = 409;
}
