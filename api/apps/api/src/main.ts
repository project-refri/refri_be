import { setServer } from '@app/common/utils/server-setting';
import { swaggerSetting } from '@app/common/utils/swagger-setting';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await setServer(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  swaggerSetting(app);

  await app.listen(configService.get<number>('PORT') || 8000);
}
bootstrap();
