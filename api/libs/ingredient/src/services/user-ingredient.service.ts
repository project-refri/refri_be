import { Logable } from '@app/common/log/log.decorator';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterUserIngredientDto } from '../dto/filter-ingredient.dto';
import {
  CreateUserIngredientDto,
  UpdateUserIngredientDto,
} from '../dto/modify-ingredient.dto';
import { UserIngredient } from '../entities/user-ingredient.entity';
import { UserIngredientRepository } from '../repositories/user-ingredient.repository';

@Logable()
@Injectable()
export class UserIngredientService {
  constructor(
    private readonly userIngredientRepository: UserIngredientRepository,
  ) {}

  async create(
    createUserIngredientDto: CreateUserIngredientDto,
  ): Promise<UserIngredient> {
    return await this.userIngredientRepository.create(createUserIngredientDto);
  }

  async findAll(
    filterUserIngredientDto: FilterUserIngredientDto,
  ): Promise<UserIngredient[]> {
    return await this.userIngredientRepository.findAll(filterUserIngredientDto);
  }

  async findOne(id: string): Promise<UserIngredient> {
    const ret = await this.userIngredientRepository.findOne(id);
    if (!ret) throw new NotFoundException('UserIngredient not found');
    return ret;
  }

  async update(
    id: string,
    updateUserIngredientDto: UpdateUserIngredientDto,
  ): Promise<UserIngredient> {
    const ret = await this.userIngredientRepository.update(
      id,
      updateUserIngredientDto,
    );
    if (!ret) throw new NotFoundException('UserIngredient not found');
    return ret;
  }

  async deleteOne(id: string): Promise<UserIngredient> {
    const ret = await this.userIngredientRepository.deleteOne(id);
    if (!ret) throw new NotFoundException('UserIngredient not found');
    return ret;
  }

  async deleteAll(
    filterUserIngredientDto: FilterUserIngredientDto,
  ): Promise<any> {
    return await this.userIngredientRepository.deleteAll(
      filterUserIngredientDto,
    );
  }
}
