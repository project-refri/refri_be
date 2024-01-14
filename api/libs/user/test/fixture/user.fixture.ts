import { UserEntity } from '@app/user/domain/user.entity';
import { Diet } from '@prisma/client';
import { CreateUserApiDto, CreateUserDto } from '@app/user/dto/create-user.dto';
import { UserDto } from '@app/user/dto/user.dto';
import { UpdateUserDto } from '@app/user/dto/update-user.dto';

export const userEntity: UserEntity = {
  id: 1,
  email: 'test@test.com',
  username: 'test',
  introduction: '',
  diet: Diet.NORMAL,
  thumbnail: '',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const userDto: UserDto = new UserDto({
  id: userEntity.id,
  email: userEntity.email,
  username: userEntity.username,
  introduction: userEntity.introduction,
  diet: userEntity.diet,
  thumbnail: userEntity.thumbnail,
  createdAt: userEntity.createdAt,
  updatedAt: userEntity.updatedAt,
});

export const createUserDto: CreateUserDto = {
  username: 'test',
  email: 'test@test.com',
};

export const createUserApiDto: CreateUserApiDto = {
  username: 'test',
};

export const updateUserDto: UpdateUserDto = {
  username: 'test',
  thumbnail: 'https://test.com/test.jpg',
  introduction: 'test',
  diet: Diet.NORMAL,
};
