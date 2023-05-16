import { Module } from '@nestjs/common';
import { LogAspectProvider } from './log.aspect';

@Module({
  providers: [LogAspectProvider],
})
export class LogModule {}
