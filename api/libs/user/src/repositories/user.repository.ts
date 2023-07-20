import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '../dto/modify-user.dto';
import { FilterUserDto } from '../dto/filter-user.dto';
import { User, UserDocument } from '../entities/user.entity';
import { UserCacheable } from '@app/common/cache/cache.decorator';
import { QueryType } from '@app/common/cache/db-cache.decorator';
import { Logable } from '@app/common/log/log.decorator';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  @UserCacheable({ action: QueryType.MODIFY_MANY, keyIdx: null })
  @Logable()
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdEntity = new this.userModel(createUserDto);
    return await createdEntity.save();
  }

  @UserCacheable({ action: QueryType.FIND_MANY, keyIdx: 0 })
  @Logable()
  async findAll(filterUserDto: FilterUserDto): Promise<User[]> {
    return await this.userModel.find(filterUserDto).exec();
  }

  @UserCacheable({ action: QueryType.FIND_ONE, keyIdx: 0 })
  @Logable()
  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ id }).exec();
  }

  @UserCacheable({ action: QueryType.FIND_ONE, keyIdx: 0 })
  @Logable()
  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  @UserCacheable({ action: QueryType.FIND_ONE, keyIdx: 0 })
  @Logable()
  async findByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ username }).exec();
  }

  @UserCacheable({ action: QueryType.MODIFY_ONE, keyIdx: 0 })
  @Logable()
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel
      .findOneAndUpdate({ id }, updateUserDto, { new: true })
      .exec();
  }

  @UserCacheable({ action: QueryType.MODIFY_ONE, keyIdx: 0 })
  @Logable()
  async deleteOne(id: string): Promise<User> {
    return await this.userModel.findOneAndDelete({ id }).exec();
  }

  @UserCacheable({ action: QueryType.MODIFY_MANY, keyIdx: null })
  @Logable()
  async deleteAll(filterUserDto: FilterUserDto): Promise<any> {
    return await this.userModel.deleteMany(filterUserDto).exec();
  }
}
