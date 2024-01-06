import { User } from '@app/user/domain/user.entity';
import { Recipe as RecipeType } from '@prisma/client';

export class Recipe implements RecipeType {
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

  constructor(props: {
    id: number;
    mongoId: string | null;
    name: string;
    description: string;
    ownerId: number | null;
    owner: User | null;
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
}
