import { TestBed } from '@automock/jest';
import { UserRepository } from '@app/user/repositories/user.repository';
import { UserService } from '@app/user/user.service';
import {
  UserEmailDuplicateException,
  UserNameDuplicateException,
} from '@app/user/exception/domain.exception';
import { createUserDto, userEntity } from '../fixture/user.fixture';

describe('UserService', () => {
  let service: UserService;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UserService).compile();

    service = unit;
    userRepository = unitRef.get(UserRepository);
  });

  describe('create', () => {
    it('should create a new user', async () => {
      userRepository.findByEmail.mockResolvedValue(undefined);
      userRepository.findByUsername.mockResolvedValue(undefined);
      userRepository.create.mockResolvedValue(userEntity);

      const result = await service.create(createUserDto);

      expect(result).toEqual(userEntity);
    });

    it('should not create user if the email already exists', async () => {
      userRepository.findByEmail.mockResolvedValue(userEntity);
      userRepository.findByUsername.mockResolvedValue(undefined);

      await expect(service.create(createUserDto)).rejects.toThrowError(
        UserEmailDuplicateException,
      );

      expect(userRepository.create).not.toHaveBeenCalled();
    });

    it('should not create user if the username already exists', async () => {
      userRepository.findByEmail.mockResolvedValue(undefined);
      userRepository.findByUsername.mockResolvedValue(userEntity);

      await expect(service.create(createUserDto)).rejects.toThrowError(
        UserNameDuplicateException,
      );

      expect(userRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('findByEmail', () => {
    it('should return the user with the given email', async () => {
      const email = 'test@test.com';
      userRepository.findByEmail.mockResolvedValue(userEntity);

      const result = await service.findByEmail(email);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(result).toEqual(userEntity);
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
