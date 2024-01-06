import { CrudPrismaRepository } from '@app/common/repository/crud-prisma.repository';
import { UserIngredient } from '../domain/user-ingredient.entity';
import {
  CreateUserIngredientDto,
  UpdateUserIngredientDto,
} from '../dto/modify-ingredient.dto';
import { FilterUserIngredientDto } from '../dto/filter-ingredient.dto';
import { IUserIngredientRepository } from './user-ingredient.repository.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/common/prisma/prisma.service';

@Injectable()
export class UserIngredientRepository
  extends CrudPrismaRepository<
    UserIngredient,
    CreateUserIngredientDto,
    UpdateUserIngredientDto,
    FilterUserIngredientDto
  >
  implements IUserIngredientRepository
{
  constructor(private readonly prisma: PrismaService) {
    super(prisma, 'userIngredient');
  }
}
