import { ApiExpose } from '@app/common/decorators/api-expose.decorator';
import { Transform } from 'class-transformer';

export class RecipesItemDto {
  public readonly id: number;

  public readonly name: string;

  public readonly thumbnail: string;

  public readonly description: string;

  @ApiExpose({ name: 'view_count' })
  public readonly viewCount: number;

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @Transform(({ value }) => value.toISOString(), { toPlainOnly: true })
  @ApiExpose({ name: 'created_at' })
  public readonly createdAt: Date;

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @Transform(({ value }) => value.toISOString(), { toPlainOnly: true })
  @ApiExpose({ name: 'updated_at' })
  public readonly updatedAt: Date;

  constructor(
    id: number = null,
    name: string = null,
    thumbnail: string = null,
    description: string = null,
    viewCount: number = null,
    createdAt: Date = null,
    updatedAt: Date = null,
  ) {
    this.id = id;
    this.name = name;
    this.thumbnail = thumbnail;
    this.description = description;
    this.viewCount = viewCount;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
