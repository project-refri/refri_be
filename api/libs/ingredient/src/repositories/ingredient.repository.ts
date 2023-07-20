import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingredient, IngredientDocument } from '../entities/ingredient.entity';

@Injectable()
export class IngredientRepository {
  constructor(
    @InjectModel(Ingredient.name)
    private readonly userIngredientModel: Model<IngredientDocument>,
  ) {}

  async create(createIngredientDto: CreateIngredientDto): Promise<Ingredient> {
    const createdEntity = new this.userIngredientModel(createIngredientDto);
    return await createdEntity.save();
  }

  async findAll(
    filterIngredientDto: FilterIngredientDto,
  ): Promise<Ingredient[]> {
    return await this.userIngredientModel.find(filterIngredientDto).exec();
  }

  async findOne(id: string): Promise<Ingredient> {
    return await this.userIngredientModel.findOne({ id }).exec();
  }

  async update(
    id: string,
    updateIngredientDto: UpdateIngredientDto,
  ): Promise<Ingredient> {
    return await this.userIngredientModel
      .findOneAndUpdate({ id }, updateIngredientDto, { new: true })
      .exec();
  }

  async deleteOne(id: string): Promise<Ingredient> {
    return await this.userIngredientModel.findOneAndDelete({ id }).exec();
  }

  // async deleteAll(filterIngredientDto: FilterIngredientDto): Promise<any> {
  //   return await this.userIngredientModel
  //     .deleteMany(filterIngredientDto)
  //     .exec();
  // }
}
