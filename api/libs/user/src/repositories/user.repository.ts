import { PrismaService } from '@app/common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from './user.repository.interface';
import { UserEntity } from '@app/user/domain/user.entity';
import { Logable } from '@app/common/log/log.decorator';
import { Cacheable } from '@app/common/cache/cache.service';
import { Diet } from '@prisma/client';
import { UpdateUserDto } from '@app/user/dto/update-user.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: UserEntity): Promise<UserEntity> {
    return await this.prisma.user.create({
      data: {
        email: entity.email,
        username: entity.username,
        introduction: entity.introduction,
        diet: Diet[entity.diet],
        thumbnail: entity.thumbnail,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      },
    });
  }

  @Logable()
  @Cacheable({
    ttl: 60 * 1000,
    keyGenerator: (user: string) => `user:${user}`,
  })
  async findOne(id: number): Promise<UserEntity> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  @Logable()
  async findByEmail(email: string): Promise<UserEntity> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  @Logable()
  async findByUsername(username: string): Promise<UserEntity> {
    return await this.prisma.user.findUnique({
      where: { username },
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.prisma.user.findMany();
  }

  async update(id: number, dto: UpdateUserDto): Promise<UserEntity> {
    return await this.prisma.user.update({
      where: { id },
      data: {
        ...dto,
        diet: Diet[dto.diet],
      },
    });
  }

  async deleteOne(id: number): Promise<UserEntity> {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
