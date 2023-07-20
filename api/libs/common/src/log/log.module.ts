import { Module } from '@nestjs/common';
import { LogDecorator } from './log.decorator';

@Module({
  providers: [LogDecorator],
})
export class LogModule {}
