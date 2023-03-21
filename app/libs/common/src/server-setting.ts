import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from './exception-filters/all-exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { swaggerSetting } from './swagger-setting';

export async function setServer(appModule: any) {
  const app = await NestFactory.create(appModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  swaggerSetting(app);

  return app;
}
