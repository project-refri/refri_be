import { TestBed } from '@automock/jest';
import { CreateUserDto } from '@app/user/dto/modify-user.dto';
import { UserRepository } from '@app/user/repositories/user.repository';
import { UserService } from '@app/user/user.service';
import { UserEntity } from '@app/user/domain/user.entity';
import { Diet } from '@prisma/client';
import {
  UserEmailDuplicateException,
  UserNameDuplicateException,
} from '@app/user/exception/domain.exception';

describe('UserService', () => {
  let service: UserService;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UserService).compile();

    service = unit;
    userRepository = unitRef.get(UserRepository);
  });

  describe('create', () => {
    const mockUser: UserEntity = {
      id: 1,
      email: 'test@example.com',
      username: 'test',
      introduction: '',
      diet: Diet.NORMAL,
      thumbnail: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
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

      expect(result).toEqual(mockUser);
    });

    it('should not create user if the email already exists', async () => {
      const createUserDto: CreateUserDto = {
        ...new CreateUserDto(),
        username: 'test',
        email: 'test@example.com',
      };
      userRepository.findByEmail.mockResolvedValue(mockUser);
      userRepository.findByUsername.mockResolvedValue(undefined);

      await expect(service.create(createUserDto)).rejects.toThrowError(
        UserEmailDuplicateException,
      );

      expect(userRepository.create).not.toHaveBeenCalled();
    });

    it('should not create user if the username already exists', async () => {
      const createUserDto: CreateUserDto = {
        ...new CreateUserDto(),
        username: 'test',
        email: 'test@example.com',
      };
      userRepository.findByEmail.mockResolvedValue(undefined);
      userRepository.findByUsername.mockResolvedValue(mockUser);

      await expect(service.create(createUserDto)).rejects.toThrowError(
        UserNameDuplicateException,
      );

      expect(userRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('findByEmail', () => {
    const mockUser: UserEntity = {
      id: 1,
      email: 'test@example.com',
      username: 'test',
      introduction: '',
      diet: Diet.NORMAL,
      thumbnail: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
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
