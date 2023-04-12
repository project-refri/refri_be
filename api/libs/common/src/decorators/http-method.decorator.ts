import { applyDecorators, HttpCode } from '@nestjs/common';
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

export const ApiPostCreated = (responseType: any) => {
  return applyDecorators(
    ApiBadRequestResponse({ type: BadRequestResponse }),
    ApiCreatedResponse({ type: responseType }),
    HttpCode(201),
  );
};

export const ApiPostOk = (responseType: any) => {
  return applyDecorators(
    HttpCode(200),
    ApiOkResponse({ type: responseType }),
    ApiBadRequestResponse({ type: BadRequestResponse }),
  );
};

export const ApiGet = (responseType: any) => {
  return applyDecorators(
    HttpCode(200),
    ApiNotFoundResponse({ type: NotFoundResponse }),
    ApiBadRequestResponse({ type: BadRequestResponse }),
    ApiOkResponse({ type: responseType }),
  );
};

export const ApiPatch = (responseType: any) => {
  return applyDecorators(
    HttpCode(200),
    ApiNotFoundResponse({ type: NotFoundResponse }),
    ApiBadRequestResponse({ type: BadRequestResponse }),
    ApiOkResponse({ type: responseType }),
  );
};

export const ApiDeleteOk = (responseType: any) => {
  return applyDecorators(
    HttpCode(200),
    ApiNotFoundResponse({ type: NotFoundResponse }),
    ApiOkResponse(responseType),
  );
};

export const ApiDeleteNoContent = () => {
  return applyDecorators(
    HttpCode(204),
    ApiNotFoundResponse({ type: NotFoundResponse }),
    ApiNoContentResponse(),
  );
};
