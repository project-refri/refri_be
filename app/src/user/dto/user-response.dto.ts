import { SuccessResponse } from 'src/commmon/dto/success-response.dto';
import { User } from '../entities/user.entity';

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
