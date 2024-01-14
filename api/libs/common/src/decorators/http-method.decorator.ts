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
  ErrorResponse,
  NotFoundResponse,
} from '../dto/error-response.dto';

export const ApiPostCreated = (
  responseType: any,
  ...domainExceptions: (typeof ErrorResponse)[]
) => {
  return applyDecorators(
    ApiBadRequestResponse({
      content: {
        'application/json': {
          examples: domainExceptions.reduce(
            (list, schema) => {
              list[schema.name] = { value: new schema() };
              return list;
            },
            { BadRequestResponse: { value: new BadRequestResponse() } },
          ),
        },
      },
    }),
    ApiCreatedResponse({ type: responseType }),
    HttpCode(201),
  );
};

export const ApiPostOk = (
  responseType: any,
  ...domainExceptions: (typeof ErrorResponse)[]
) => {
  return applyDecorators(
    ApiBadRequestResponse({
      content: {
        'application/json': {
          examples: domainExceptions.reduce(
            (list, schema) => {
              list[schema.name] = { value: new schema() };
              return list;
            },
            { BadRequestResponse: { value: new BadRequestResponse() } },
          ),
        },
      },
    }),
    HttpCode(200),
    ApiOkResponse({ type: responseType }),
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

export const ApiPatch = (
  responseType: any,
  ...domainExceptions: (typeof ErrorResponse)[]
) => {
  return applyDecorators(
    ApiBadRequestResponse({
      content: {
        'application/json': {
          examples: domainExceptions.reduce(
            (list, schema) => {
              list[schema.name] = { value: new schema() };
              return list;
            },
            { BadRequestResponse: { value: new BadRequestResponse() } },
          ),
        },
      },
    }),
    HttpCode(200),
    ApiNotFoundResponse({ type: NotFoundResponse }),
    ApiOkResponse({ type: responseType }),
  );
};

export const ApiDeleteOk = (
  responseType: any,
  ...domainExceptions: (typeof ErrorResponse)[]
) => {
  return applyDecorators(
    ApiBadRequestResponse({
      content: {
        'application/json': {
          examples: domainExceptions.reduce(
            (list, schema) => {
              list[schema.name] = { value: new schema() };
              return list;
            },
            { BadRequestResponse: { value: new BadRequestResponse() } },
          ),
        },
      },
    }),
    HttpCode(200),
    ApiNotFoundResponse({ type: NotFoundResponse }),
    ApiOkResponse(responseType),
  );
};

export const ApiDeleteNoContent = (
  ...domainExceptions: (typeof ErrorResponse)[]
) => {
  return applyDecorators(
    ApiBadRequestResponse({
      content: {
        'application/json': {
          examples: domainExceptions.reduce(
            (list, schema) => {
              list[schema.name] = { value: new schema() };
              return list;
            },
            { BadRequestResponse: { value: new BadRequestResponse() } },
          ),
        },
      },
    }),
    HttpCode(204),
    ApiNotFoundResponse({ type: NotFoundResponse }),
    ApiNoContentResponse(),
  );
};
