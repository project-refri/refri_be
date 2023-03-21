import {
  applyDecorators,
  HttpCode,
  HttpStatus,
  Post as NestPost,
  Get as NestGet,
  Patch as NestPatch,
  Delete as NestDelete,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  BadRequestResponse,
  NotFoundResponse,
} from '../dto/error-response.dto';

export const Post = (responseType: any, path?: string) => {
  return applyDecorators(
    NestPost(path),
    HttpCode(HttpStatus.CREATED),
    ApiBadRequestResponse({ type: BadRequestResponse }),
    ApiCreatedResponse({ type: responseType }),
  );
};

export const Get = (responseType: any, path?: string) => {
  return applyDecorators(
    NestGet(path),
    HttpCode(HttpStatus.OK),
    ApiNotFoundResponse({ type: NotFoundResponse }),
    ApiBadRequestResponse({ type: BadRequestResponse }),
    ApiOkResponse({ type: responseType }),
  );
};

export const Patch = (responseType: any, path?: string) => {
  return applyDecorators(
    NestPatch(path),
    HttpCode(HttpStatus.OK),
    ApiNotFoundResponse({ type: NotFoundResponse }),
    ApiBadRequestResponse({ type: BadRequestResponse }),
    ApiOkResponse({ type: responseType }),
  );
};

export const Delete = (path?: string) => {
  return applyDecorators(
    NestDelete(path),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiNotFoundResponse({ type: NotFoundResponse }),
    ApiNoContentResponse(),
  );
};
