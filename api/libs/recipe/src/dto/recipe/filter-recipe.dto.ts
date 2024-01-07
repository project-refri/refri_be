import { PagenationDto } from '@app/common/dto/pagenation.dto';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiExpose } from '@app/common/decorators/api-expose.decorator';

export class FilterRecipeDto extends PagenationDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @ApiExpose({ name: 'owner_id', isOptional: true })
  @IsNotEmpty()
  @IsOptional()
  ownerId?: number;

  @ApiExpose({ name: 'created_at', isOptional: true })
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @ApiExpose({ name: 'updated_at', isOptional: true })
  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @ApiExpose({ name: 'mysql_id', isOptional: true })
  @IsInt()
  @IsOptional()
  mysqlId?: number;

  constructor(
    page: number,
    limit: number,
    name?: string,
    owner_id?: number,
    created_at?: Date,
    updated_at?: Date,
  ) {
    super(page, limit);
    this.name = name;
    this.ownerId = owner_id;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
  }
}
