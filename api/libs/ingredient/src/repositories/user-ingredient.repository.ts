import { CommonRepository } from '@app/common/common.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilterUserIngredientDto } from '../dto/filter-ingredient.dto';
import { CreateUserIngredientDto } from '../dto/modify-ingredient.dto';
import {
  UserIngredient,
  UserIngredientDocument,
} from '../entities/user-ingredient.entity';

@Injectable()
export class UserIngredientRepository extends CommonRepository<
  UserIngredient,
  CreateUserIngredientDto,
  any,
  FilterUserIngredientDto
> {
  constructor(
    @InjectModel(UserIngredient.name)
    private readonly userIngredientModel: Model<UserIngredientDocument>,
  ) {
    super(userIngredientModel);
  }
}
