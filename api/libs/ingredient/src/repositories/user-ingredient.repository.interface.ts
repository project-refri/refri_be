import { ICrudRepository } from '@app/common/repository/crud.repository';
import { UserIngredient as MongoUserIngredient } from '@app/ingredient/domain/mongo/mongo.user-ingredient.entity';
import { UserIngredient as PrismaUserIngredient } from '../domain/user-ingredient.entity';
import { CreateUserIngredientDto } from '../dto/create-user-ingredient.dto';
import { FilterUserIngredientDto } from '../dto/filter-ingredient.dto';
import { UpdateUserIngredientDto } from '@app/ingredient/dto/update-user-ingredient.dto';

type UserIngredient = MongoUserIngredient | PrismaUserIngredient;

export type IUserIngredientRepository = ICrudRepository<
  UserIngredient,
  CreateUserIngredientDto,
  UpdateUserIngredientDto,
  FilterUserIngredientDto
>;
