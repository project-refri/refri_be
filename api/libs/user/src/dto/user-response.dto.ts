import { SuccessResponse } from '@app/common/dto/success-response.dto';
import { User } from '@app/user/domain/user.entity';

export class CreateUserResponseDto extends SuccessResponse {
  data: User;
}

export class UpdateUserResponseDto extends SuccessResponse {
  data: User;
}

export class FindAllUserResponseDto extends SuccessResponse {
  data: User[];
}

export class FindOneUserResponseDto extends SuccessResponse {
  data: User;
}
