import { User, UserEntity } from '@app/user/domain/user.entity';
import { Recipe as RecipeType } from '@prisma/client';

export class RecipeEntity implements RecipeType {
  public readonly id: number;
  public readonly mongoId: string | null;
  public readonly name: string;
  public readonly description: string;
  public readonly ownerId: number | null;
  public readonly owner?: UserEntity | null;
  public readonly thumbnail: string;
  public readonly originUrl: string;
  public readonly viewCount: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(props: {
    id: number;
    mongoId: string | null;
    name: string;
    description: string;
    ownerId: number | null;
    owner?: UserEntity | null;
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
    return new RecipeEntity({
      id: recipe.id,
      mongoId: recipe.mongoId,
      name: recipe.name,
      description: recipe.description,
      ownerId: recipe.ownerId,
      owner: recipe.owner ? UserEntity.from(recipe.owner) : undefined,
      thumbnail: recipe.thumbnail,
      originUrl: recipe.originUrl,
      viewCount: recipe.viewCount,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
    });
  }
}

export class Recipe {
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
    this._id = props.id;
    this._mongoId = props.mongoId;
    this._name = props.name;
    this._description = props.description;
    this._ownerId = props.ownerId;
    this._owner = props.owner;
    this._thumbnail = props.thumbnail;
    this._originUrl = props.originUrl;
    this._viewCount = props.viewCount;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  private _id: number;

  get id(): number {
    return this._id;
  }

  private _mongoId: string | null;

  get mongoId(): string | null {
    return this._mongoId;
  }

  private _name: string;

  get name(): string {
    return this._name;
  }

  private _description: string;

  get description(): string {
    return this._description;
  }

  private _ownerId: number | null;

  get ownerId(): number | null {
    return this._ownerId;
  }

  private _owner?: User | null;

  get owner(): User | null {
    return this._owner;
  }

  private _thumbnail: string;

  get thumbnail(): string {
    return this._thumbnail;
  }

  private _originUrl: string;

  get originUrl(): string {
    return this._originUrl;
  }

  private _viewCount = 0;

  get viewCount(): number {
    return this._viewCount;
  }

  private _createdAt: Date;

  get createdAt(): Date {
    return this._createdAt;
  }

  private _updatedAt: Date;

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
