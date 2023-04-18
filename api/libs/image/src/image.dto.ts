import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ImageDomain } from './image-domain.enum';
import { OkResponse } from '@app/common/dto/success-response.dto';

export class UploadImageDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  image: Express.Multer.File;

  @IsEnum(ImageDomain)
  domain: ImageDomain;
}

export class ImageUrlDto {
  @ApiProperty()
  url: string;
}

export class UploadImageResponseDto extends OkResponse {
  data: ImageUrlDto;
}
