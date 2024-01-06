import { CrudPrismaRepository } from '@app/common/repository/crud-prisma.repository';
import { FilterNotiDto } from '../dto/filter-noti.dto';
import { CreateNotiDto, UpdateNotiDto } from '../dto/modify-noti.dto';
import { Noti } from '@app/noti/domain/noti.entity';
import { INotiRepository } from './noti.repository.interface';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotiRepository
  extends CrudPrismaRepository<
    Noti,
    CreateNotiDto,
    UpdateNotiDto,
    FilterNotiDto
  >
  implements INotiRepository
{
  constructor(private readonly prisma: PrismaService) {
    super(prisma, 'noti');
  }
}
