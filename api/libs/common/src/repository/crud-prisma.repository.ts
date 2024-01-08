import { Logable } from '../log/log.decorator';
import { PrismaService } from '../prisma/prisma.service';
import { ICrudRepository } from './crud.repository';

export class CrudPrismaRepository<Entity, CreateDto, UpdateDto>
  implements ICrudRepository<Entity, CreateDto, UpdateDto>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly entityName: string,
  ) {}

  @Logable()
  async create(createDto: CreateDto): Promise<Entity> {
    return await this.prismaService[this.entityName].create({
      data: createDto,
    });
  }

  @Logable()
  async findAll(): Promise<Entity[]> {
    return await this.prismaService[this.entityName].findMany();
  }

  @Logable()
  async findOne(id: number): Promise<Entity> {
    return await this.prismaService[this.entityName].findUnique({
      where: { id },
    });
  }

  @Logable()
  async update(id: number, updateDto: UpdateDto) {
    return await this.prismaService[this.entityName].update({
      where: { id },
      data: updateDto,
    });
  }

  @Logable()
  async deleteOne(id: number): Promise<Entity> {
    return await this.prismaService[this.entityName].delete({ where: { id } });
  }
}
