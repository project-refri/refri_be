import { CommonRepository } from '@app/common/common.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRefreshTokenDto } from '../dto/token.dto';
import {
  RefreshToken,
  RefreshTokenDocument,
} from '../entities/refresh-token.entity';

export class AuthRepository extends CommonRepository<
  RefreshToken,
  CreateRefreshTokenDto,
  any,
  any
> {
  constructor(
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshTokenDocument>,
  ) {
    super(refreshTokenModel);
  }

  async deleteByUUID(uuid: string) {
    return await this.refreshTokenModel.findOneAndDelete({ uuid }).exec();
  }
}
