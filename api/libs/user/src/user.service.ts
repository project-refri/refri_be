import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repositories/user.repository';
import { Logable } from '@app/common/log/log.decorator';
import { ConfigService } from '@nestjs/config';
import { User, UserEntity } from '@app/user/domain/user.entity';
import {
  UserEmailDuplicateException,
  UserNameDuplicateException,
} from '@app/user/exception/domain.exception';
import { UpdateUserDto } from '@app/user/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  @Logable()
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email, username } = createUserDto;
    const [dupEmail, dupUsername] = await Promise.all([
      this.userRepository.findByEmail(email),
      this.userRepository.findByUsername(username),
    ]);
    if (dupEmail) {
      throw new UserEmailDuplicateException();
    }
    if (dupUsername) {
      throw new UserNameDuplicateException();
    }
    if (!createUserDto.thumbnail) {
      createUserDto.thumbnail = `https://${this.configService.get<string>(
        'AWS_S3_IMAGE_MAIN_BUCKET',
      )}.s3.amazonaws.com/default-user-thumbnail.jpg`;
    }
    const user = User.create(createUserDto, new Date());
    return await this.userRepository.create(UserEntity.from(user));
  }

  @Logable()
  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.findAll();
  }

  @Logable()
  async findOne(id: number): Promise<UserEntity> {
    const ret = await this.userRepository.findOne(id);
    if (!ret) {
      throw new NotFoundException('User not found.');
    }
    return ret;
  }

  @Logable()
  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findByEmail(email);
  }

  @Logable()
  async update(id: number, updateDto: UpdateUserDto): Promise<UserEntity> {
    const { username } = updateDto;
    const dupUsername = await this.userRepository.findByUsername(username);
    if (dupUsername) {
      throw new UserNameDuplicateException();
    }
    const ret = await this.userRepository.update(id, updateDto);
    if (!ret) {
      throw new NotFoundException('User not found.');
    }
    return ret;
  }

  @Logable()
  async deleteOne(id: number): Promise<UserEntity> {
    const ret = await this.userRepository.deleteOne(id);
    if (!ret) {
      throw new NotFoundException('User not found.');
    }
    return ret;
  }
}
