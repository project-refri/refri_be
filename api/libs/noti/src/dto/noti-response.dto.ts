import {
  CreatedResponse,
  NoContentResponse,
  OkResponse,
} from '@app/common/dto/success-response.dto';
import { Noti } from '../entity/noti.entity';

export class CreateNotiResponseDto extends CreatedResponse {
  data: Noti;
}

export class UpdateNotiResponseDto extends OkResponse {
  data: Noti;
}

export class FindNotisResponseDto extends OkResponse {
  data: Noti[];
}

export class FindOneNotiResponseDto extends OkResponse {
  data: Noti;
}

export class DeleteNotiResponseDto extends NoContentResponse {
  data: Noti;
}
