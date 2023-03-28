import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dto/modify-user.dto';
import { FilterUserDto } from '../dto/filter-user.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { CommonService } from '@app/common/common.service';

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

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, username } = createUserDto;
    const [dup1, dup2] = await Promise.all([
      this.userRepository.findByEmail(email),
      this.userRepository.findByUsername(username),
    ]);
    if (dup1 || dup2) {
      throw new BadRequestException('Duplicated email or username.');
    }
    return await this.userRepository.create(createUserDto);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }
}