import { PrismaService } from '@app/common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { IAuthRepository } from './auth.repository.interface';
import { Logable } from '@app/common/log/log.decorator';
import { Cacheable } from '@app/common/cache/cache.service';
import { CreateSessionDto } from '@app/auth/dto/token.dto';
import { SessionEntity } from '@app/auth/domain/session.entity';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSessionDto): Promise<SessionEntity> {
    return await this.prisma.session.create({
      data: dto,
    });
  }

  async findOne(id: number): Promise<SessionEntity> {
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
  async findBySessionToken(session: string): Promise<SessionEntity> {
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

  async findAll(): Promise<SessionEntity[]> {
    return await this.prisma.session.findMany();
  }

  async update(id: number, dto: any): Promise<SessionEntity> {
    throw new Error('Method not implemented.');
  }

  async deleteOne(id: number): Promise<SessionEntity> {
    return await this.prisma.session.delete({
      where: { id },
    });
  }

  @Logable()
  @Cacheable({
    keyGenerator: (session: string) => `session:${session}`,
    action: 'del',
  })
  async deleteBySessionToken(session: string): Promise<SessionEntity> {
    return await this.prisma.session.delete({
      where: { sessionToken: session },
    });
  }
}
