import { UserService } from '@app/user/user.service';

export const MockedUserService = {
  provide: UserService,
  useValue: {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByEmail: jest.fn(),
    update: jest.fn(),
    deleteOne: jest.fn(),
  },
};
