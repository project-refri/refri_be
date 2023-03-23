import { NotFoundException } from '@nestjs/common';

export class CommonService<Entity, CreateDto, UpdateDto, FilterDto> {
  private repository: any;
  constructor(repository: any) {
    this.repository = repository;
  }

  async create(createDto: CreateDto): Promise<Entity> {
    return await this.repository.create(createDto);
  }

  async findAll(filterDto: FilterDto): Promise<Entity[]> {
    return await this.repository.findAll(filterDto);
  }

  async findOne(id: string): Promise<Entity> {
    const ret = await this.repository.findOne(id);
    if (!ret) throw new NotFoundException('Entity not found');
    return ret;
  }

  async update(id: string, updateDto: UpdateDto): Promise<Entity> {
    const ret = await this.repository.update(id, updateDto);
    if (!ret) throw new NotFoundException('Entity not found');
    return ret;
  }

  async delete(id: string): Promise<Entity> {
    const ret = await this.repository.delete(id);
    if (!ret) throw new NotFoundException('Entity not found');
    return ret;
  }

  async deleteAll(filterDto: FilterDto): Promise<any> {
    return await this.repository.deleteAll(filterDto);
  }
}
