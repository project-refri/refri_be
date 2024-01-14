import { SuccessResponse } from '@app/common/dto/success-response.dto';
import { UserDto } from '@app/user/dto/user.dto';
import { ErrorResponse } from '@app/common/dto/error-response.dto';
import {
  UserEmailDuplicateException,
  UserNameDuplicateException,
} from '@app/user/exception/domain.exception';

export class CreateUserResponseDto extends SuccessResponse {
  data: UserDto;
}

export class UpdateUserResponseDto extends SuccessResponse {
  data: UserDto;
}

export class FindAllUserResponseDto extends SuccessResponse {
  data: UserDto[];
}

export class FindOneUserResponseDto extends SuccessResponse {
  data: UserDto;
}

export class UserEmailDuplicateResponseDto extends ErrorResponse {
  error = {
    name: UserEmailDuplicateException.name,
    message: UserEmailDuplicateException.message,
  };
}

export class UserNameDuplicateResponseDto extends ErrorResponse {
  error = {
    name: UserNameDuplicateException.name,
    message: UserNameDuplicateException.message,
  };
}
