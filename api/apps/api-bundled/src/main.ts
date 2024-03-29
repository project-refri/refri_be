import { setServer } from '@app/common/utils/server-setting';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await setServer(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  await app.listen(configService.get<number>('PORT') || 8080);
}
bootstrap();
