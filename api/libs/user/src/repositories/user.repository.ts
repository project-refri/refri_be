import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '../dto/modify-user.dto';
import { FilterUserDto } from '../dto/filter-user.dto';
import { User, UserDocument } from '../entities/user.entity';
import { UserCacheable } from '@app/common/cache/decorators/cache.decorator';
import { QueryType } from '@app/common/cache/query.type';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdEntity = new this.userModel(createUserDto);
    return await createdEntity.save();
  }

  async findAll(filterUserDto: FilterUserDto): Promise<User[]> {
    return await this.userModel.find(filterUserDto).exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ id }).exec();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ username }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel
      .findOneAndUpdate({ id }, updateUserDto, { new: true })
      .exec();
  }

  async deleteOne(id: string): Promise<User> {
    return await this.userModel.findOneAndDelete({ id }).exec();
  }

  async deleteAll(filterUserDto: FilterUserDto): Promise<any> {
    return await this.userModel.deleteMany(filterUserDto).exec();
  }
}
