import { Model } from 'mongoose';
import { ICrudRepository } from './crud.repository';

export class CrudMongoRepository<Entity, CreateDto, UpdateDto, FilterDto>
  implements ICrudRepository<Entity, CreateDto, UpdateDto, FilterDto>
{
  private model: Model<any>;
  constructor(model: Model<any>) {
    this.model = model;
  }

  async create(createDto: CreateDto): Promise<Entity> {
    const createdEntity = new this.model(createDto);
    return await createdEntity.save();
  }

  async findAll(filterDto: FilterDto): Promise<Entity[]> {
    return await this.model.find(filterDto).exec();
  }

  async findOne(id: string): Promise<Entity> {
    return await this.model.findOne({ id }).exec();
  }

  async update(id: string, updateDto: UpdateDto) {
    return await this.model.findOneAndUpdate({ id }, updateDto, {
      new: true,
    });
  }

  async deleteOne(id: string): Promise<Entity> {
    return await this.model.findOneAndDelete({ id }).exec();
  }
}