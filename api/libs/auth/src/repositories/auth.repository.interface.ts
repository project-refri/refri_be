import { SessionEntity as PrismaSession } from '../domain/session.entity';
import { CreateSessionDto } from '../dto/token.dto';
import { Session as MongoSession } from '../domain/mongo.session.entity';
import { ICrudRepository } from '@app/common/repository/crud.repository';

type Session = PrismaSession | MongoSession;

export interface IAuthRepository
  extends ICrudRepository<Session, CreateSessionDto, any> {
  findBySessionToken(session: string): Promise<Session>;

  deleteBySessionToken(session: string): Promise<Session>;
}
