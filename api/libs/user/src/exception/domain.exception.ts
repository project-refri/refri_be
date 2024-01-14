import { DomainException } from '@app/common/exception-filters/exception';

export class UserEmailDuplicateException extends DomainException {
  static message = 'User email already exists';
  message = 'User email already exists';
}

export class UserNameDuplicateException extends DomainException {
  static message = 'User username already exists';
  message = 'User username already exists';
}
