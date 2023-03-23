import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './commmon/interceptors/transform.interceptor';
import { swaggerSetting } from './commmon/swagger-setting';
import { AllExceptionsFilter } from './commmon/exception-filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  swaggerSetting(app);

  const configService = app.get<ConfigService>(ConfigService);

  await app.listen(configService.get<number>('PORT') || 8000);
}
bootstrap();
