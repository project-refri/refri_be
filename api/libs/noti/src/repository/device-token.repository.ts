import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { IDeviceTokenRepository } from './device-token.repository.interface';
import { CreateDeviceTokenDto } from '@app/noti/dto/create-device-token.dto';
import { DeviceToken } from '@app/noti/domain/device-token.entity';

@Injectable()
export class DeviceTokenRepository implements IDeviceTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateDeviceTokenDto) {
    const ret = await this.prisma.deviceToken.create({
      data: dto,
    });
    return new DeviceToken(ret);
  }

  async findAll() {
    const ret = await this.prisma.deviceToken.findMany();
    return ret.map((item) => new DeviceToken(item));
  }

  async findOne(id: number) {
    const ret = await this.prisma.deviceToken.findUnique({
      where: { id },
    });
    return new DeviceToken(ret);
  }

  async update(id: number, dto: any): Promise<DeviceToken> {
    throw new Error('Method not implemented.');
  }

  async deleteOne(id: number) {
    const ret = await this.prisma.deviceToken.delete({
      where: { id },
    });
    return new DeviceToken(ret);
  }
}
