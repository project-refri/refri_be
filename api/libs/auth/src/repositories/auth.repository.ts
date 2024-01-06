import { PrismaService } from '@app/common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { IAuthRepository } from './auth.repository.interface';
import { CreateSessionDto } from '../dto/token.dto';
import { Session } from '@prisma/client';
import { CrudPrismaRepository } from '../../../common/src/repository/crud-prisma.repository';
import { Logable } from '@app/common/log/log.decorator';
import { Cacheable } from '@app/common/cache/cache.service';

@Injectable()
export class AuthRepository
  extends CrudPrismaRepository<Session, CreateSessionDto, any, any>
  implements IAuthRepository
{
  constructor(private readonly prisma: PrismaService) {
    super(prisma, 'session');
  }

  async findOne(id: number): Promise<Session> {
    return await this.prisma.session.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  @Logable()
  @Cacheable({
    ttl: 24 * 60 * 60 * 1000,
    keyGenerator: (session: string) => `session:${session}`,
  })
  async findBySessionToken(session: string) {
    return await this.prisma.session.findUnique({
      where: { sessionToken: session },
      include: {
        user: {
          include: {
            deviceTokens: true,
          },
        },
      },
    });
  }

  @Logable()
  @Cacheable({
    keyGenerator: (session: string) => `session:${session}`,
    action: 'del',
  })
  async deleteBySessionToken(session: string): Promise<any> {
    return await this.prisma.session.delete({
      where: { sessionToken: session },
    });
  }
}
