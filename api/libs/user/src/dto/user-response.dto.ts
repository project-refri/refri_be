import { SuccessResponse } from '@app/common/dto/success-response.dto';
import { UserDto } from '@app/user/dto/user.dto';

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
