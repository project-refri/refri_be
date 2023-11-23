import { ICrudRepository } from '@app/common/repository/crud.repository';
import { User as MongoUser } from '../entities/mongo.user.entity';
import { User as PrismaUser } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto/modify-user.dto';
import { FilterUserDto } from '../dto/filter-user.dto';

type User = MongoUser | PrismaUser;

export interface IUserRepository
  extends ICrudRepository<User, CreateUserDto, UpdateUserDto, FilterUserDto> {
  findByEmail(email: string): Promise<User>;
  findByUsername(username: string): Promise<User>;
}
