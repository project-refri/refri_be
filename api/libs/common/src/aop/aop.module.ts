import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';

import { AspectInjector } from './aspect-injector';

@Module({
  imports: [DiscoveryModule],
  providers: [AspectInjector],
})
export class AopModule {}
