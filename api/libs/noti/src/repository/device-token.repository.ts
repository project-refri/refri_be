import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { IDeviceTokenRepository } from './device-token.repository.interface';
import { CreateDeviceTokenDto } from '@app/noti/dto/create-device-token.dto';
import { DeviceTokenEntity } from '@app/noti/domain/device-token.entity';

@Injectable()
export class DeviceTokenRepository implements IDeviceTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateDeviceTokenDto): Promise<DeviceTokenEntity> {
    return await this.prisma.deviceToken.create({
      data: dto,
    });
  }

  async findAll(): Promise<DeviceTokenEntity[]> {
    return await this.prisma.deviceToken.findMany();
  }

  async findOne(id: number): Promise<DeviceTokenEntity> {
    return await this.prisma.deviceToken.findUnique({
      where: { id },
    });
  }

  async update(id: number, dto: any): Promise<DeviceTokenEntity> {
    throw new Error('Method not implemented.');
  }

  async deleteOne(id: number): Promise<DeviceTokenEntity> {
    return await this.prisma.deviceToken.delete({
      where: { id },
    });
  }
}
