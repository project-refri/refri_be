import { FoodType } from '@app/ingredient/domain/food-type.enum';
import { StoreMethod } from '@app/ingredient/domain/store-method.enum';
import { $Enums, UserIngredient as UserIngredientType } from '@prisma/client';

export class UserIngredientEntity implements UserIngredientType {
  public readonly id: number;
  public readonly name: string;
  public readonly ingredientId: number;
  public readonly userId: number;
  public readonly foodType: $Enums.FoodType;
  public readonly storeMethod: $Enums.StoreMethod;
  public readonly count: number;
  public readonly daysBeforeExpiration: number;
  public readonly icon: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export class UserIngredient {
  constructor(props: {
    id: number;
    name: string;
    ingredientId: number;
    userId: number;
    foodType: FoodType;
    storeMethod: StoreMethod;
    count: number;
    daysBeforeExpiration: number;
    icon: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this._id = props.id;
    this._name = props.name;
    this._ingredientId = props.ingredientId;
    this._userId = props.userId;
    this._foodType = props.foodType;
    this._storeMethod = props.storeMethod;
    this._count = props.count;
    this._daysBeforeExpiration = props.daysBeforeExpiration;
    this._icon = props.icon;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  private _id: number;

  get id(): number {
    return this._id;
  }

  private _name: string;

  get name(): string {
    return this._name;
  }

  private _ingredientId: number;

  get ingredientId(): number {
    return this._ingredientId;
  }

  private _userId: number;

  get userId(): number {
    return this._userId;
  }

  private _foodType: FoodType;

  get foodType(): FoodType {
    return this._foodType;
  }

  private _storeMethod: StoreMethod;

  get storeMethod(): StoreMethod {
    return this._storeMethod;
  }

  private _count: number;

  get count(): number {
    return this._count;
  }

  private _daysBeforeExpiration: number;

  get daysBeforeExpiration(): number {
    return this._daysBeforeExpiration;
  }

  private _icon: string;

  get icon(): string {
    return this._icon;
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
