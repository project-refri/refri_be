import { UserIngredientCacheable } from '@app/common/cache/decorators/cache.decorator';
import { QueryType } from '@app/common/cache/types/query.type';
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

  @UserIngredientCacheable({
    action: QueryType.MODIFY_MANY,
    keyIdx: null,
  })
  async create(
    createUserIngredientDto: CreateUserIngredientDto,
  ): Promise<UserIngredient> {
    const createdEntity = new this.userIngredientModel(createUserIngredientDto);
    return await createdEntity.save();
  }

  @UserIngredientCacheable({
    action: QueryType.FIND_MANY,
    keyIdx: 0,
  })
  async findAll(
    filterUserIngredientDto: FilterUserIngredientDto,
  ): Promise<UserIngredient[]> {
    return await this.userIngredientModel.find(filterUserIngredientDto).exec();
  }

  @UserIngredientCacheable({
    action: QueryType.FIND_ONE,
    keyIdx: 0,
  })
  async findOne(id: string): Promise<UserIngredient> {
    return await this.userIngredientModel.findOne({ id }).exec();
  }

  @UserIngredientCacheable({
    action: QueryType.MODIFY_ONE,
    keyIdx: 0,
  })
  async update(
    id: string,
    updateUserIngredientDto: UpdateUserIngredientDto,
  ): Promise<UserIngredient> {
    return await this.userIngredientModel
      .findOneAndUpdate({ id }, updateUserIngredientDto, { new: true })
      .exec();
  }

  @UserIngredientCacheable({
    action: QueryType.MODIFY_ONE,
    keyIdx: 0,
  })
  async deleteOne(id: string): Promise<UserIngredient> {
    return await this.userIngredientModel.findOneAndDelete({ id }).exec();
  }

  @UserIngredientCacheable({
    action: QueryType.MODIFY_MANY,
    keyIdx: null,
  })
  async deleteAll(
    filterUserIngredientDto: FilterUserIngredientDto,
  ): Promise<any> {
    return await this.userIngredientModel
      .deleteMany(filterUserIngredientDto)
      .exec();
  }
}
