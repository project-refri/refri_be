import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '../dto/modify-user.dto';
import { FilterUserDto } from '../dto/filter-user.dto';
import { User, UserDocument } from '@app/user/domain/mongo.user.entity';
import { Logable } from '@app/common/log/log.decorator';
import { Cacheable } from '@app/common/cache/cache.service';
import { IUserRepository } from './user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  @Logable()
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdEntity = new this.userModel(createUserDto);
    return await createdEntity.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  @Logable()
  async findAllByCond(filterUserDto: FilterUserDto): Promise<User[]> {
    return await this.userModel.find(filterUserDto).exec();
  }

  @Logable()
  @Cacheable({
    ttl: 60 * 1000,
    keyGenerator: (user: string) => `user:${user}`,
  })
  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ id }).exec();
  }

  @Logable()
  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  @Logable()
  async findByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ username }).exec();
  }

  @Logable()
  @Cacheable({
    keyGenerator: (user: string) => `user:${user}`,
    action: 'del',
  })
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel
      .findOneAndUpdate({ id }, updateUserDto, { new: true })
      .exec();
  }

  @Logable()
  async deleteOne(id: string): Promise<User> {
    return await this.userModel.findOneAndDelete({ id }).exec();
  }

  @Logable()
  async deleteAll(filterUserDto: FilterUserDto): Promise<any> {
    return await this.userModel.deleteMany(filterUserDto).exec();
  }
}
