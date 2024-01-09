import { NotiEntity } from '@app/noti/domain/noti.entity';
import { ApiExpose } from '@app/common/decorators/api-expose.decorator';

export class NotiDto {
  public readonly id: number;

  @ApiExpose({ name: 'user_id' })
  public readonly userId: number;

  public readonly content: string;

  @ApiExpose({ name: 'created_at' })
  public readonly createdAt: Date;

  @ApiExpose({ name: 'updated_at' })
  public readonly updatedAt: Date;

  constructor(props: {
    id: number;
    userId: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = props.id;
    this.userId = props.userId;
    this.content = props.content;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static fromEntity(noti: NotiEntity) {
    return new NotiDto({
      id: noti.id,
      userId: noti.userId,
      content: noti.content,
      createdAt: noti.createdAt,
      updatedAt: noti.updatedAt,
    });
  }
}
