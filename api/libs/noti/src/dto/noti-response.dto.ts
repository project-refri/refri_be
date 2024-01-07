import {
  CreatedResponse,
  NoContentResponse,
  OkResponse,
} from '@app/common/dto/success-response.dto';
import { NotiDto } from '@app/noti/dto/noti.dto';

export class CreateNotiResponseDto extends CreatedResponse {
  data: NotiDto;
}

export class UpdateNotiResponseDto extends OkResponse {
  data: NotiDto;
}

export class FindNotisResponseDto extends OkResponse {
  data: NotiDto[];
}

export class FindOneNotiResponseDto extends OkResponse {
  data: NotiDto;
}

export class DeleteNotiResponseDto extends NoContentResponse {
  data: NotiDto;
}
