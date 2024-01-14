import { DomainException } from '@app/common/exception-filters/exception';

export class RecipeNotExistsException extends DomainException {
  static message = 'Recipe not exists';
  message = 'Recipe not exists';
}

export class UserNotExistsException extends DomainException {
  static message = 'User not exists';
  message = 'User not exists';
}

export class RecipeBookmarkDuplicateException extends DomainException {
  static message = 'Recipe bookmark already exists';
  message = 'Recipe bookmark already exists';
}
