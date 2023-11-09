import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilterUserIngredientDto } from '../dto/filter-ingredient.dto';
import {
  CreateUserIngredientDto,
  UpdateUserIngredientDto,
} from '../dto/modify-ingredient.dto';
import {
  UserIngredient,
  UserIngredientDocument,
} from '../entities/user-ingredient.entity';

@Injectable()
export class UserIngredientRepository {
  constructor(
    @InjectModel(UserIngredient.name)
    private readonly userIngredientModel: Model<UserIngredientDocument>,
  ) {}

  async create(
    createUserIngredientDto: CreateUserIngredientDto,
  ): Promise<UserIngredient> {
    const createdEntity = new this.userIngredientModel(createUserIngredientDto);
    return await createdEntity.save();
  }

  async findAll(
    filterUserIngredientDto: FilterUserIngredientDto,
  ): Promise<UserIngredient[]> {
    return await this.userIngredientModel.find(filterUserIngredientDto).exec();
  }

  async findOne(id: string): Promise<UserIngredient> {
    return await this.userIngredientModel.findOne({ id }).exec();
  }

  async update(
    id: string,
    updateUserIngredientDto: UpdateUserIngredientDto,
  ): Promise<UserIngredient> {
    return await this.userIngredientModel
      .findOneAndUpdate({ id }, updateUserIngredientDto, { new: true })
      .exec();
  }

  async deleteOne(id: string): Promise<UserIngredient> {
    return await this.userIngredientModel.findOneAndDelete({ id }).exec();
  }

  async deleteAll(
    filterUserIngredientDto: FilterUserIngredientDto,
  ): Promise<any> {
    return await this.userIngredientModel
      .deleteMany(filterUserIngredientDto)
      .exec();
  }
}
