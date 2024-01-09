import { INotiRepository } from './noti.repository.interface';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateNotiDto } from '@app/noti/dto/create-noti.dto';
import { UpdateNotiDto } from '@app/noti/dto/update-noti.dto';
import { NotiEntity } from '@app/noti/domain/noti.entity';

@Injectable()
export class NotiRepository implements INotiRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateNotiDto): Promise<NotiEntity> {
    return await this.prisma.noti.create({
      data: dto,
    });
  }

  async findAll(): Promise<NotiEntity[]> {
    return await this.prisma.noti.findMany();
  }

  async findOne(id: number): Promise<NotiEntity> {
    return await this.prisma.noti.findUnique({
      where: { id },
    });
  }

  async update(id: number, dto: UpdateNotiDto): Promise<NotiEntity> {
    return await this.prisma.noti.update({
      where: { id },
      data: dto,
    });
  }

  async deleteOne(id: number): Promise<NotiEntity> {
    return await this.prisma.noti.delete({
      where: { id },
    });
  }
}
