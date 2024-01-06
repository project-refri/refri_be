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
} from '@app/ingredient/domain/mongo/mongo.user-ingredient.entity';
import { CrudMongoRepository } from '@app/common/repository/crud-mongo.repository';
import { IUserIngredientRepository } from './user-ingredient.repository.interface';

@Injectable()
export class UserIngredientRepository
  extends CrudMongoRepository<
    UserIngredient,
    CreateUserIngredientDto,
    UpdateUserIngredientDto,
    FilterUserIngredientDto
  >
  implements IUserIngredientRepository
{
  constructor(
    @InjectModel(UserIngredient.name)
    private readonly userIngredientModel: Model<UserIngredientDocument>,
  ) {
    super(userIngredientModel);
  }
}
