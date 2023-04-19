import { CommonService } from '@app/common/common.service';
import { Injectable } from '@nestjs/common';
import { FilterUserIngredientDto } from '../dto/filter-ingredient.dto';
import { CreateUserIngredientDto } from '../dto/modify-ingredient.dto';
import { UserIngredient } from '../entities/user-ingredient.entity';
import { UserIngredientRepository } from '../repositories/user-ingredient.repository';

@Injectable()
export class UserIngredientService extends CommonService<
  UserIngredient,
  CreateUserIngredientDto,
  any,
  FilterUserIngredientDto
> {
  constructor(
    private readonly userIngredientRepository: UserIngredientRepository,
  ) {
    super(userIngredientRepository);
  }
}
