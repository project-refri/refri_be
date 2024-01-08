import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateNotiDto } from '@app/noti/dto/create-noti.dto';

export class UpdateNotiDto extends PartialType(
  OmitType(CreateNotiDto, ['userId'] as const),
) {}
