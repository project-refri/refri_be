import { INotiRepository } from './noti.repository.interface';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateNotiDto } from '@app/noti/dto/create-noti.dto';
import { Noti } from '@app/noti/domain/noti.entity';
import { UpdateNotiDto } from '@app/noti/dto/update-noti.dto';

@Injectable()
export class NotiRepository implements INotiRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateNotiDto) {
    const ret = await this.prisma.noti.create({
      data: dto,
    });
    return new Noti(ret);
  }

  async findAll() {
    const ret = await this.prisma.noti.findMany();
    return ret.map((item) => new Noti(item));
  }

  async findOne(id: number) {
    const ret = await this.prisma.noti.findUnique({
      where: { id },
    });
    return new Noti(ret);
  }

  async update(id: number, dto: UpdateNotiDto) {
    const ret = await this.prisma.noti.update({
      where: { id },
      data: dto,
    });
    return new Noti(ret);
  }

  async deleteOne(id: number) {
    const ret = await this.prisma.noti.delete({
      where: { id },
    });
    return new Noti(ret);
  }
}
