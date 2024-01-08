import { Diet } from '@app/user/domain/diet.enum';

export class User {
  constructor(props: {
    id: number;
    username: string;
    email: string;
    introduction: string;
    diet: Diet;
    thumbnail: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this._id = props.id;
    this._username = props.username;
    this._email = props.email;
    this._introduction = props.introduction;
    this._diet = props.diet;
    this._thumbnail = props.thumbnail;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  private _id: number;

  get id(): number {
    return this._id;
  }

  private _username: string;

  get username(): string {
    return this._username;
  }

  private _email: string;

  get email(): string {
    return this._email;
  }

  private _introduction: string;

  get introduction(): string {
    return this._introduction;
  }

  private _diet: Diet;

  get diet(): Diet {
    return this._diet;
  }

  private _thumbnail: string;

  get thumbnail(): string {
    return this._thumbnail;
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
