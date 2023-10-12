import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session, SessionDocument } from '../entities/session.entity';
import { CreateSessionDto } from '../dto/token.dto';
import { Logable } from '@app/common/log/log.decorator';

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
  async findBySessionToken(session: string): Promise<Session> {
    return await this.sessionModel
      .findOne({ session_token: session })
      .populate('user')
      .exec();
  }

  async deleteOne(id: string): Promise<Session> {
    return await this.sessionModel.findOneAndDelete({ id }).exec();
  }

  async deleteAll(filterSessionDto: any): Promise<any> {
    return await this.sessionModel.deleteMany(filterSessionDto).exec();
  }

  @Logable()
  async deleteBySessionToken(session: string) {
    return await this.sessionModel
      .findOneAndDelete({ session_token: session })
      .exec();
  }
}
