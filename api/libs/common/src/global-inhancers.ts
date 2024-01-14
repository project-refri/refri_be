import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TransformInterceptor } from '@app/common/interceptors/transform.interceptor';
import {
  ClassSerializerInterceptor,
  Provider,
  ValidationPipe,
} from '@nestjs/common';
import { AllExceptionsFilter } from '@app/common/exception-filters/all-exception.filter';

export const globalInhancers: Provider[] = [
  {
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor,
  },
  {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  },
  {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      transform: true,
    }),
  },
];
