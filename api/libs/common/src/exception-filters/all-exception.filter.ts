import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { DomainException } from '@app/common/exception-filters/exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let httpStatus: HttpStatus;
    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
    } else if (exception instanceof DomainException) {
      httpStatus = HttpStatus.BAD_REQUEST;
    } else {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    let error: string | object;
    if (exception instanceof HttpException) {
      error = {
        name: exception.name,
        message: exception.message,
      };
    } else if (exception instanceof DomainException) {
      error = exception.getResponse();
    } else {
      error = 'Internal server error';
    }

    console.error(exception);

    const responseBody = {
      success: false,
      error,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
