import { Model } from 'mongoose';
import { ICrudRepository } from './crud.repository';

export class CrudMongoRepository<Entity, CreateDto, UpdateDto>
  implements ICrudRepository<Entity, CreateDto, UpdateDto>
{
  private model: Model<any>;

  constructor(model: Model<any>) {
    this.model = model;
  }

  async create(createDto: CreateDto): Promise<Entity> {
    const createdEntity = new this.model(createDto);
    return (await createdEntity.save())?.toObject();
  }

  async findAll(): Promise<Entity[]> {
    return (await this.model.find().exec()).map((e) => e.toObject());
  }

  async findOne(id: string): Promise<Entity> {
    return (await this.model.findOne({ id }).exec())?.toObject();
  }

  async update(id: string, updateDto: UpdateDto) {
    return (
      await this.model.findOneAndUpdate({ id }, updateDto, {
        new: true,
      })
    )?.toObject();
  }

  async deleteOne(id: string): Promise<Entity> {
    return (await this.model.findOneAndDelete({ id }).exec())?.toObject();
  }
}
