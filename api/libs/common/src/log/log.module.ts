import { Module } from '@nestjs/common';
import { LogDecorator } from './log.decorator';
import { ClsModule } from 'nestjs-cls';
import { v4 as uuid } from 'uuid';

@Module({
  imports: [
    ClsModule.forRoot({
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: (req: Request) => {
          return (req.headers['x-request-id'] as string) ?? uuid().slice(0, 8);
        },
      },
    }),
  ],
  providers: [LogDecorator],
})
export class LogModule {}
