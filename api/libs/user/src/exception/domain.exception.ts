import { DomainException } from '@app/common/exception-filters/exception';

export class UserEmailDuplicateException extends DomainException {
  message = 'User email already exists';
}

export class UserNameDuplicateException extends DomainException {
  message = 'User username already exists';
}
