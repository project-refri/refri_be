import { Injectable } from '@nestjs/common';
import { CommonService } from '../../commmon/common.service';
import { CreateUserDto, UpdateUserDto } from '../dto/modify-user.dto';
import { FilterUserDto } from '../dto/filter-user.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService extends CommonService<
  User,
  CreateUserDto,
  UpdateUserDto,
  FilterUserDto
> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }
}
