import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRefreshTokenDto } from '../dto/token.dto';
import {
  RefreshToken,
  RefreshTokenDocument,
} from '../entities/refresh-token.entity';

export class AuthRepository {
  constructor(
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshTokenDocument>,
  ) {}

  async create(
    createRefreshTokenDto: CreateRefreshTokenDto,
  ): Promise<RefreshToken> {
    const createdEntity = new this.refreshTokenModel(createRefreshTokenDto);
    return await createdEntity.save();
  }

  async findAll(filterRefreshTokenDto: any): Promise<RefreshToken[]> {
    return await this.refreshTokenModel.find(filterRefreshTokenDto).exec();
  }

  async findOne(id: string): Promise<RefreshToken> {
    return await this.refreshTokenModel.findOne({ id }).exec();
  }

  async update(id: string, updateRefreshTokenDto: any): Promise<RefreshToken> {
    return await this.refreshTokenModel
      .findOneAndUpdate({ id }, updateRefreshTokenDto, { new: true })
      .exec();
  }

  async deleteOne(id: string): Promise<RefreshToken> {
    return await this.refreshTokenModel.findOneAndDelete({ id }).exec();
  }

  async deleteAll(filterRefreshTokenDto: any): Promise<any> {
    return await this.refreshTokenModel
      .deleteMany(filterRefreshTokenDto)
      .exec();
  }

  async deleteByUUID(uuid: string) {
    return await this.refreshTokenModel.findOneAndDelete({ uuid }).exec();
  }
}
