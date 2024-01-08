import { User } from '@app/user/domain/user.entity';
import { Recipe } from '@app/recipe/domain/recipe.entity';
import { ApiExpose } from '@app/common/decorators/api-expose.decorator';

export class RecipeDto {
  id: number;

  @ApiExpose({ name: 'mongo_id' })
  mongoId: string | null;

  name: string;

  description: string;

  @ApiExpose({ name: 'owner_id' })
  ownerId: number | null;

  owner?: User | null;

  thumbnail: string;

  @ApiExpose({ name: 'origin_url' })
  originUrl: string;

  @ApiExpose({ name: 'view_count' })
  viewCount: number;

  @ApiExpose({ name: 'created_at' })
  createdAt: Date;

  @ApiExpose({ name: 'updated_at' })
  updatedAt: Date;

  constructor(props: {
    id: number;
    mongoId: string | null;
    name: string;
    description: string;
    ownerId: number | null;
    owner?: User | null;
    thumbnail: string;
    originUrl: string;
    viewCount: number;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = props.id;
    this.mongoId = props.mongoId;
    this.name = props.name;
    this.description = props.description;
    this.ownerId = props.ownerId;
    this.owner = props.owner;
    this.thumbnail = props.thumbnail;
    this.originUrl = props.originUrl;
    this.viewCount = props.viewCount;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static from(recipe: Recipe) {
    return new RecipeDto({
      id: recipe.id,
      mongoId: recipe.mongoId,
      name: recipe.name,
      description: recipe.description,
      ownerId: recipe.ownerId,
      owner: recipe.owner,
      thumbnail: recipe.thumbnail,
      originUrl: recipe.originUrl,
      viewCount: recipe.viewCount,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
    });
  }
}
