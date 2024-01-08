import { PrismaService } from '@app/common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from './user.repository.interface';
import { User } from '@app/user/domain/user.entity';
import { Logable } from '@app/common/log/log.decorator';
import { Cacheable } from '@app/common/cache/cache.service';
import { CreateUserDto, UpdateUserDto } from '@app/user/dto/modify-user.dto';
import { Diet } from '@prisma/client';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const ret = await this.prisma.user.create({
      data: dto,
    });
    return new User({
      id: ret.id,
      email: ret.email,
      username: ret.username,
      introduction: ret.introduction,
      diet: ret.diet,
      thumbnail: ret.thumbnail,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    });
  }

  @Logable()
  @Cacheable({
    ttl: 60 * 1000,
    keyGenerator: (user: string) => `user:${user}`,
  })
  async findOne(id: number) {
    const ret = await this.prisma.user.findUnique({
      where: { id },
    });
    return new User({
      id: ret.id,
      email: ret.email,
      username: ret.username,
      introduction: ret.introduction,
      diet: ret.diet,
      thumbnail: ret.thumbnail,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    });
  }

  @Logable()
  async findByEmail(email: string): Promise<User> {
    const ret = await this.prisma.user.findUnique({
      where: { email },
    });
    return new User({
      id: ret.id,
      email: ret.email,
      username: ret.username,
      introduction: ret.introduction,
      diet: ret.diet,
      thumbnail: ret.thumbnail,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    });
  }

  @Logable()
  async findByUsername(username: string): Promise<User> {
    const ret = await this.prisma.user.findUnique({
      where: { username },
    });
    return new User({
      id: ret.id,
      email: ret.email,
      username: ret.username,
      introduction: ret.introduction,
      diet: ret.diet,
      thumbnail: ret.thumbnail,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    });
  }

  async findAll(): Promise<User[]> {
    const ret = await this.prisma.user.findMany();
    return ret.map(
      (user) =>
        new User({
          id: user.id,
          email: user.email,
          username: user.username,
          introduction: user.introduction,
          diet: user.diet,
          thumbnail: user.thumbnail,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }),
    );
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const ret = await this.prisma.user.update({
      where: { id },
      data: {
        ...dto,
        diet: Diet[dto.diet],
      },
    });
    return new User({
      id: ret.id,
      email: ret.email,
      username: ret.username,
      introduction: ret.introduction,
      diet: ret.diet,
      thumbnail: ret.thumbnail,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    });
  }

  async deleteOne(id: number): Promise<User> {
    const ret = await this.prisma.user.delete({
      where: { id },
    });
    return new User({
      id: ret.id,
      email: ret.email,
      username: ret.username,
      introduction: ret.introduction,
      diet: ret.diet,
      thumbnail: ret.thumbnail,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    });
  }
}
