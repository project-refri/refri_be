import { PrismaService } from '@app/common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { IAuthRepository } from './auth.repository.interface';
import { Logable } from '@app/common/log/log.decorator';
import { Cacheable } from '@app/common/cache/cache.service';
import { CreateSessionDto } from '@app/auth/dto/token.dto';
import { Session } from '@app/auth/domain/session.entity';
import { User } from '@app/user/domain/user.entity';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSessionDto): Promise<Session> {
    const ret = await this.prisma.session.create({
      data: dto,
    });
    return new Session({
      id: ret.id,
      sessionToken: ret.sessionToken,
      userId: ret.userId,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    });
  }

  async findOne(id: number): Promise<Session> {
    const ret = await this.prisma.session.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
    return new Session({
      id: ret.id,
      sessionToken: ret.sessionToken,
      userId: ret.userId,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    });
  }

  @Logable()
  @Cacheable({
    ttl: 24 * 60 * 60 * 1000,
    keyGenerator: (session: string) => `session:${session}`,
  })
  async findBySessionToken(session: string) {
    const ret = await this.prisma.session.findUnique({
      where: { sessionToken: session },
      include: {
        user: {
          include: {
            deviceTokens: true,
          },
        },
      },
    });
    return new Session({
      id: ret.id,
      sessionToken: ret.sessionToken,
      user: new User(ret.user),
      userId: ret.userId,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    });
  }

  async findAll() {
    const ret = await this.prisma.session.findMany();
    return ret.map(
      (item) =>
        new Session({
          id: item.id,
          sessionToken: item.sessionToken,
          userId: item.userId,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }),
    );
  }

  async update(id: number, dto: any): Promise<Session> {
    throw new Error('Method not implemented.');
  }

  async deleteOne(id: number): Promise<Session> {
    const ret = await this.prisma.session.delete({
      where: { id },
    });
    return new Session({
      id: ret.id,
      sessionToken: ret.sessionToken,
      userId: ret.userId,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    });
  }

  @Logable()
  @Cacheable({
    keyGenerator: (session: string) => `session:${session}`,
    action: 'del',
  })
  async deleteBySessionToken(session: string) {
    const ret = await this.prisma.session.delete({
      where: { sessionToken: session },
    });
    return new Session({
      id: ret.id,
      sessionToken: ret.sessionToken,
      userId: ret.userId,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    });
  }
}
