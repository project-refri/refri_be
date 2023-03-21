import { Model } from 'mongoose';

export class CommonRepository<Entity, CreateDto, UpdateDto, FilterDto> {
  private model: Model<any>;
  constructor(model: any) {
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

  async update(id: string, updateDto: UpdateDto): Promise<Entity> {
    return await this.model
      .findOneAndUpdate({ id }, updateDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Entity> {
    return await this.model.findOneAndDelete({ id }).exec();
  }

  async deleteAll(filterDto: FilterDto): Promise<any> {
    return await this.model.deleteMany(filterDto).exec();
  }
}
