import { IUserIngredientRepository } from './user-ingredient.repository.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { FilterUserIngredientDto } from '@app/ingredient/dto/filter-ingredient.dto';
import { FoodType, StoreMethod } from '@prisma/client';
import { CreateUserIngredientDto } from '@app/ingredient/dto/create-user-ingredient.dto';
import { UserIngredientEntity } from '@app/ingredient/domain/user-ingredient.entity';

@Injectable()
export class UserIngredientRepository implements IUserIngredientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserIngredientDto): Promise<UserIngredientEntity> {
    return await this.prisma.userIngredient.create({
      data: {
        ...dto,
        foodType: FoodType[dto.foodType],
        storeMethod: StoreMethod[dto.storeMethod],
      },
    });
  }

  async findAllByCond(
    filterUserIngredientDto: FilterUserIngredientDto,
  ): Promise<UserIngredientEntity[]> {
    return await this.prisma.userIngredient.findMany({
      where: {
        ...filterUserIngredientDto,
        foodType: FoodType[filterUserIngredientDto.foodType],
        storeMethod: StoreMethod[filterUserIngredientDto.storeMethod],
      },
    });
  }

  async findAll(): Promise<UserIngredientEntity[]> {
    return await this.prisma.userIngredient.findMany();
  }

  async findOne(id: number): Promise<UserIngredientEntity> {
    return await this.prisma.userIngredient.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    dto: CreateUserIngredientDto,
  ): Promise<UserIngredientEntity> {
    return await this.prisma.userIngredient.update({
      where: { id },
      data: {
        ...dto,
        foodType: FoodType[dto.foodType],
        storeMethod: StoreMethod[dto.storeMethod],
      },
    });
  }

  async deleteOne(id: number): Promise<UserIngredientEntity> {
    return await this.prisma.userIngredient.delete({
      where: { id },
    });
  }
}
