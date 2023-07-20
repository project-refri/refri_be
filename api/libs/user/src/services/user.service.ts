import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dto/modify-user.dto';
import { FilterUserDto } from '../dto/filter-user.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, username } = createUserDto;
    const [dupEmail, dupUsername] = await Promise.all([
      this.userRepository.findByEmail(email),
      this.userRepository.findByUsername(username),
    ]);
    if (dupEmail || dupUsername) {
      throw new BadRequestException('Duplicated email or username.');
    }
    return await this.userRepository.create(createUserDto);
  }

  async findAll(filterDto: any): Promise<User[]> {
    return await this.userRepository.findAll(filterDto);
  }

  async findOne(id: string): Promise<User> {
    const ret = await this.userRepository.findOne(id);
    if (!ret) {
      throw new NotFoundException('User not found.');
    }
    return ret;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }

  async update(id: string, updateDto: UpdateUserDto): Promise<User> {
    const { username } = updateDto;
    const dupUsername = await this.userRepository.findByUsername(username);
    if (dupUsername) {
      throw new BadRequestException('Duplicated username.');
    }
    const ret = await this.userRepository.update(id, updateDto);
    if (!ret) {
      throw new NotFoundException('User not found.');
    }
    return ret;
  }

  async deleteOne(id: string): Promise<User> {
    const ret = await this.userRepository.deleteOne(id);
    if (!ret) {
      throw new NotFoundException('User not found.');
    }
    return ret;
  }

  async deleteAll(filterDto: FilterUserDto): Promise<any> {
    return await this.userRepository.deleteAll(filterDto);
  }
}
