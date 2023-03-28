import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '../dto/modify-user.dto';
import { FilterUserDto } from '../dto/filter-user.dto';
import { User, UserDocument } from '../entities/user.entity';
import { CommonRepository } from '@app/common/common.repository';

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

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ username }).exec();
  }
}
