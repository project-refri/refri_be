import { ICrudRepository } from '@app/common/repository/crud.repository';
import { UserIngredient as MongoUserIngredient } from '../entities/mongo/mongo.user-ingredient.entity';
import { UserIngredient as PrismaUserIngredient } from '../entities/user-ingredient.entity';
import {
  CreateUserIngredientDto,
  UpdateUserIngredientDto,
} from '../dto/modify-ingredient.dto';
import { FilterUserIngredientDto } from '../dto/filter-ingredient.dto';

type UserIngredient = MongoUserIngredient | PrismaUserIngredient;

export type IUserIngredientRepository = ICrudRepository<
  UserIngredient,
  CreateUserIngredientDto,
  UpdateUserIngredientDto,
  FilterUserIngredientDto
>;
