import { Callback, Context, Handler } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';
import { setServer } from '@app/common/utils/server-setting';
import { MonoLambdaModule } from './mono_lambda.module';

let server: Handler;

async function bootstrap() {
  const app = await setServer(MonoLambdaModule);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  if (event.path === '/api') {
    event.path = '/api/';
  }
  event.path = event.path.includes('swagger-ui')
    ? `/api${event.path}`
    : event.path;
  return server(event, context, callback);
};
