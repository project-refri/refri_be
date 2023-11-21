import { PrismaService } from '../prisma/prisma.service';
import { ICrudRepository } from './crud.repository';

export class CrudPrismaRepository<Entity, CreateDto, UpdateDto, FilterDto>
  implements ICrudRepository<Entity, CreateDto, UpdateDto, FilterDto>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly entityName: string,
  ) {}

  async create(createDto: CreateDto): Promise<Entity> {
    return await this.prismaService[this.entityName].create({
      data: createDto,
    });
  }

  async findAll(filterDto: FilterDto): Promise<Entity[]> {
    return await this.prismaService[this.entityName].findMany({
      where: filterDto,
    });
  }

  async findOne(id: number): Promise<Entity> {
    return await this.prismaService[this.entityName].findUnique({
      where: { id },
    });
  }

  async update(id: number, updateDto: UpdateDto) {
    return await this.prismaService[this.entityName].update({
      where: { id },
      data: updateDto,
    });
  }

  async deleteOne(id: number): Promise<Entity> {
    return await this.prismaService[this.entityName].delete({ where: { id } });
  }
}
