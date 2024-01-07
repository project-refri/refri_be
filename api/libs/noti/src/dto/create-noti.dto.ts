import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiExpose } from '@app/common/decorators/api-expose.decorator';

export class CreateNotiDto {
  @ApiExpose({ name: 'user_id' })
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  userId: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}
