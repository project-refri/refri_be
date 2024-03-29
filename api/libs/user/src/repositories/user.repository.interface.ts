import { ICrudRepository } from '@app/common/repository/crud.repository';
import { User as MongoUser } from '@app/user/domain/mongo.user.entity';
import { UserEntity as PrismaUser } from '@app/user/domain/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '@app/user/dto/update-user.dto';

type User = MongoUser | PrismaUser;

export interface IUserRepository
  extends ICrudRepository<User, CreateUserDto, UpdateUserDto> {
  findByEmail(email: string): Promise<User>;

  findByUsername(username: string): Promise<User>;
}
