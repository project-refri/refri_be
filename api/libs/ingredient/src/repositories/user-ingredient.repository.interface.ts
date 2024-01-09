import { ICrudRepository } from '@app/common/repository/crud.repository';
import { UserIngredient as MongoUserIngredient } from '@app/ingredient/domain/mongo/mongo.user-ingredient.entity';
import { UserIngredientEntity as PrismaUserIngredient } from '../domain/user-ingredient.entity';
import { CreateUserIngredientDto } from '../dto/create-user-ingredient.dto';
import { UpdateUserIngredientDto } from '@app/ingredient/dto/update-user-ingredient.dto';
import { FilterUserIngredientDto } from '@app/ingredient/dto/filter-ingredient.dto';

type UserIngredient = MongoUserIngredient | PrismaUserIngredient;

export interface IUserIngredientRepository
  extends ICrudRepository<
    UserIngredient,
    CreateUserIngredientDto,
    UpdateUserIngredientDto
  > {
  findAllByCond(
    filterUserIngredientDto: FilterUserIngredientDto,
  ): Promise<UserIngredient[]>;
}
