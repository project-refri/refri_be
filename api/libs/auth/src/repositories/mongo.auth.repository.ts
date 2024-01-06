import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session, SessionDocument } from '../domain/mongo.session.entity';
import { CreateSessionDto } from '../dto/token.dto';
import { Logable } from '@app/common/log/log.decorator';
import { Cacheable } from '@app/common/cache/cache.service';

export class AuthRepository {
  constructor(
    @InjectModel(Session.name)
    private readonly sessionModel: Model<SessionDocument>,
  ) {}

  @Logable()
  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    const createdEntity = new this.sessionModel(createSessionDto);
    return await createdEntity.save();
  }

  async findAll(filterSessionDto: any): Promise<Session[]> {
    return await this.sessionModel.find(filterSessionDto).exec();
  }

  async findOne(id: string): Promise<Session> {
    return await this.sessionModel.findOne({ id }).exec();
  }

  @Logable()
  @Cacheable({
    ttl: 24 * 60 * 60 * 1000,
    keyGenerator: (session: string) => `session:${session}`,
  })
  async findBySessionToken(session: string): Promise<Session> {
    return (
      await this.sessionModel
        .findOne({ session_token: session })
        .populate({
          path: 'user',
          populate: {
            path: 'device_tokens',
          },
        })
        .exec()
    )?.toObject();
  }

  async deleteOne(id: string): Promise<Session> {
    return await this.sessionModel.findOneAndDelete({ id }).exec();
  }

  async deleteAll(filterSessionDto: any): Promise<any> {
    return await this.sessionModel.deleteMany(filterSessionDto).exec();
  }

  @Logable()
  @Cacheable({
    keyGenerator: (session: string) => `session:${session}`,
    action: 'del',
  })
  async deleteBySessionToken(session: string) {
    return await this.sessionModel
      .findOneAndDelete({ session_token: session })
      .exec();
  }
}
