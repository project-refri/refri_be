import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilterUserIngredientDto } from '../dto/filter-ingredient.dto';
import { CreateUserIngredientDto } from '../dto/create-user-ingredient.dto';
import {
  UserIngredient,
  UserIngredientDocument,
} from '@app/ingredient/domain/mongo/mongo.user-ingredient.entity';
import { CrudMongoRepository } from '@app/common/repository/crud-mongo.repository';
import { IUserIngredientRepository } from './user-ingredient.repository.interface';
import { UpdateUserIngredientDto } from '@app/ingredient/dto/update-user-ingredient.dto';

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
