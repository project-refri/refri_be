import { NotFoundException } from '@nestjs/common';
import { ICrudRepository } from './crud.repository';
import { MongoTransactional } from './transaction/mongo-transaction.service';

export class CrudService<Entity, CreateDto, UpdateDto, FilterDto> {
  private repository: ICrudRepository<Entity, CreateDto, UpdateDto, FilterDto>;
  constructor(
    repository: ICrudRepository<Entity, CreateDto, UpdateDto, FilterDto>,
  ) {
    this.repository = repository;
  }

  @MongoTransactional()
  async create(createDto: CreateDto): Promise<Entity> {
    return await this.repository.create(createDto);
  }

  @MongoTransactional({ readOnly: true })
  async findAll(filterDto: FilterDto): Promise<Entity[]> {
    return await this.repository.findAll(filterDto);
  }

  @MongoTransactional({ readOnly: true })
  async findOne(id: string): Promise<Entity> {
    const ret = await this.repository.findOne(id);
    if (!ret) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return ret;
  }

  @MongoTransactional()
  async update(id: string, updateDto: UpdateDto): Promise<Entity> {
    const ret = await this.repository.update(id, updateDto);
    if (!ret) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return ret;
  }

  @MongoTransactional()
  async deleteOne(id: string): Promise<void> {
    const ret = await this.repository.deleteOne(id);
    if (!ret) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
  }
}
