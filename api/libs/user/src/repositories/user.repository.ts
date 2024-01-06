import { PrismaService } from '@app/common/prisma/prisma.service';
import { CrudPrismaRepository } from '@app/common/repository/crud-prisma.repository';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from './user.repository.interface';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto/modify-user.dto';
import { FilterUserDto } from '../dto/filter-user.dto';
import { Logable } from '@app/common/log/log.decorator';
import { Cacheable } from '@app/common/cache/cache.service';

@Injectable()
export class UserRepository
  extends CrudPrismaRepository<
    User,
    CreateUserDto,
    UpdateUserDto,
    FilterUserDto
  >
  implements IUserRepository
{
  constructor(private readonly prisma: PrismaService) {
    super(prisma, 'user');
  }

  @Logable()
  @Cacheable({
    ttl: 60 * 1000,
    keyGenerator: (user: string) => `user:${user}`,
  })
  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
      include: {
        deviceTokens: {
          select: {
            fcmDeviceToken: true,
          },
        },
      },
    });
  }

  @Logable()
  async findByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  @Logable()
  async findByUsername(username: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { username },
    });
  }
}
