import { Session as PrismaSession } from '@prisma/client';
import { CreateSessionDto } from '../dto/token.dto';
import { Session as MongoSession } from '../domain/mongo.session.entity';
import { ICrudRepository } from '@app/common/repository/crud.repository';

type Session = PrismaSession | MongoSession;

export interface IAuthRepository
  extends ICrudRepository<Session, CreateSessionDto, any, any> {
  findBySessionToken(session: string): Promise<Session>;

  deleteBySessionToken(session: string): Promise<Session>;
}
