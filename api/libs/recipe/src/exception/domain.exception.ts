import { DomainException } from '@app/common/exception-filters/exception';

export class RecipeNotExistsException extends DomainException {
  message = 'Recipe not exists';
}

export class UserNotExistsException extends DomainException {
  message = 'User not exists';
}

export class RecipeBookmarkDuplicateException extends DomainException {
  message = 'Recipe bookmark already exists';
}
