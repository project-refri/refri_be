import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/modify-user.dto';
import { UserRepository } from './repositories/user.repository';
import { Logable } from '@app/common/log/log.decorator';
import { ConfigService } from '@nestjs/config';
import { User } from '@app/user/domain/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  @Logable()
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, username } = createUserDto;
    const [dupEmail, dupUsername] = await Promise.all([
      this.userRepository.findByEmail(email),
      this.userRepository.findByUsername(username),
    ]);
    if (dupEmail || dupUsername) {
      throw new BadRequestException('Duplicated email or username.');
    }
    if (!createUserDto.thumbnail) {
      createUserDto.thumbnail = `https://${this.configService.get<string>(
        'AWS_S3_IMAGE_MAIN_BUCKET',
      )}.s3.amazonaws.com/default-user-thumbnail.jpg`;
    }
    return await this.userRepository.create(createUserDto);
  }

  @Logable()
  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  @Logable()
  async findOne(id: number): Promise<User> {
    const ret = await this.userRepository.findOne(id);
    if (!ret) {
      throw new NotFoundException('User not found.');
    }
    return ret;
  }

  @Logable()
  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }

  @Logable()
  async update(id: number, updateDto: UpdateUserDto): Promise<User> {
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

  @Logable()
  async deleteOne(id: number): Promise<User> {
    const ret = await this.userRepository.deleteOne(id);
    if (!ret) {
      throw new NotFoundException('User not found.');
    }
    return ret;
  }
}
