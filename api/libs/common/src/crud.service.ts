import { NotFoundException } from '@nestjs/common';
import { ICrudRepository } from './repository/crud.repository';
import { Logable } from './log/log.decorator';

export class CrudService<Entity, CreateDto, UpdateDto> {
  private repository: ICrudRepository<Entity, CreateDto, UpdateDto>;

  constructor(repository: ICrudRepository<Entity, CreateDto, UpdateDto>) {
    this.repository = repository;
  }

  @Logable()
  async create(createDto: CreateDto): Promise<Entity> {
    return await this.repository.create(createDto);
  }

  @Logable()
  async findAll(): Promise<Entity[]> {
    return await this.repository.findAll();
  }

  @Logable()
  async findOne(id: number): Promise<Entity> {
    const ret = await this.repository.findOne(id);
    if (!ret) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return ret;
  }

  @Logable()
  async update(id: number, updateDto: UpdateDto): Promise<Entity> {
    const ret = await this.repository.update(id, updateDto);
    if (!ret) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return ret;
  }

  @Logable()
  async deleteOne(id: number): Promise<void> {
    const ret = await this.repository.deleteOne(id);
    if (!ret) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
  }
}
