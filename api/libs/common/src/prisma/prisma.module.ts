import {
  Global,
  Inject,
  Module,
  OnApplicationShutdown,
  OnModuleInit,
  Provider,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaClient } from '@prisma/client';

const prismaProvider: Provider = {
  provide: PrismaService,
  useFactory: () => {
    return new PrismaClient({
      log: [],
      // log: ['query', 'info'],
    });
  },
};

@Global()
@Module({
  providers: [prismaProvider],
  exports: [PrismaService],
})
export class PrismaModule implements OnModuleInit, OnApplicationShutdown {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.prisma.$connect();
  }

  async onApplicationShutdown(signal?: string) {
    console.log('PrismaService.onApplicationShutdown', signal);
    await this.prisma.$disconnect();
  }
}
