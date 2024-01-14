import { AuthService } from '@app/auth/auth.service';
import { SessionAuthGuard } from '@app/auth/guards/session-auth.guard';
import { RegisterAuthGuard } from '@app/auth/guards/register-auth.guard';

export const MockedAuthService = {
  provide: AuthService,
  useValue: {
    register: jest.fn(),
    verifyRegisterToken: jest.fn(),
    findBySessionToken: jest.fn(),
    login: jest.fn(),
    OAuthLoginByEmail: jest.fn(),
    googleLogin: jest.fn(),
    kakaoLogin: jest.fn(),
    logout: jest.fn(),
  },
};

export const MockedSessionAuthGuard = {
  provide: SessionAuthGuard,
  useValue: {
    canActivate: jest.fn(),
  },
};

export const MockedRegisterAuthGuard = {
  provide: RegisterAuthGuard,
  useValue: {
    canActivate: jest.fn(),
  },
};
