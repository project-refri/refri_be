import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonRepository } from '../../commmon/common.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { FilterUserDto } from '../dto/filter-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User, UserDocument } from '../entities/user.entity';

@Injectable()
export class UserRepository extends CommonRepository<
  User,
  CreateUserDto,
  UpdateUserDto,
  FilterUserDto
> {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }
}
