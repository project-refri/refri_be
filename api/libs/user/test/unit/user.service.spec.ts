import { TestBed } from '@automock/jest';
import { BadRequestException } from '@nestjs/common';
import { CreateUserDto } from '@app/user/dto/modify-user.dto';
import { UserRepository } from '@app/user/repositories/user.repository';
import { UserService } from '@app/user/user.service';
import { User } from '@app/user/domain/user.entity';
import { Diet } from '@app/user/domain/diet.enum';

describe('UserService', () => {
  let service: UserService;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UserService).compile();

    service = unit;
    userRepository = unitRef.get(UserRepository);
  });

  describe('create', () => {
    const mockUser: User = new User({
      id: 1,
      email: 'test@example.com',
      username: 'test',
      introduction: '',
      diet: Diet.NORMAL,
      thumbnail: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        ...new CreateUserDto(),
        username: 'test',
        email: 'test@example.com',
      };
      userRepository.findByEmail.mockResolvedValue(undefined);
      userRepository.findByUsername.mockResolvedValue(undefined);
      userRepository.create.mockResolvedValue(mockUser);

      const result = await service.create(createUserDto);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(
        createUserDto.email,
      );
      expect(userRepository.findByUsername).toHaveBeenCalledWith(
        createUserDto.username,
      );
      expect(userRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(mockUser);
    });

    it('should throw a BadRequestException if the email already exists', async () => {
      const createUserDto: CreateUserDto = {
        ...new CreateUserDto(),
        username: 'test',
        email: 'test@example.com',
      };
      userRepository.findByEmail.mockResolvedValue(mockUser);
      userRepository.findByUsername.mockResolvedValue(undefined);

      await expect(service.create(createUserDto)).rejects.toThrowError(
        BadRequestException,
      );

      expect(userRepository.findByEmail).toHaveBeenCalledWith(
        createUserDto.email,
      );
      expect(userRepository.findByUsername).toHaveBeenCalled();
      expect(userRepository.create).not.toHaveBeenCalled();
    });

    it('should throw a BadRequestException if the username already exists', async () => {
      const createUserDto: CreateUserDto = {
        ...new CreateUserDto(),
        username: 'test',
        email: 'test@example.com',
      };
      userRepository.findByEmail.mockResolvedValue(undefined);
      userRepository.findByUsername.mockResolvedValue(mockUser);

      await expect(service.create(createUserDto)).rejects.toThrowError(
        BadRequestException,
      );

      expect(userRepository.findByEmail).toHaveBeenCalledWith(
        createUserDto.email,
      );
      expect(userRepository.findByUsername).toHaveBeenCalledWith(
        createUserDto.username,
      );
      expect(userRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('findByEmail', () => {
    const mockUser: User = new User({
      id: 1,
      email: 'test@example.com',
      username: 'test',
      introduction: '',
      diet: Diet.NORMAL,
      thumbnail: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    it('should return the user with the given email', async () => {
      const email = 'test@example.com';
      userRepository.findByEmail.mockResolvedValue(mockUser);

      const result = await service.findByEmail(email);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(result).toEqual(mockUser);
    });

    it('should return undefined if no user is found with the given email', async () => {
      const email = 'nonexistent@example.com';
      userRepository.findByEmail.mockResolvedValue(undefined);

      const result = await service.findByEmail(email);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(result).toBeUndefined();
    });
  });
});