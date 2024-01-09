import { User, UserEntity } from '@app/user/domain/user.entity';
import { Session as SessionType } from '@prisma/client';

export class SessionEntity implements SessionType {
  public readonly id: number;
  public readonly sessionToken: string;
  public readonly user?: UserEntity;
  public readonly userId: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export class Session {
  constructor(props: {
    id: number;
    sessionToken: string;
    user?: User;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this._id = props.id;
    this._sessionToken = props.sessionToken;
    this._user = props.user;
    this._userId = props.userId;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  private _id: number;

  get id() {
    return this._id;
  }

  private _sessionToken: string;

  get sessionToken() {
    return this._sessionToken;
  }

  private _user?: User;

  get user() {
    return this._user;
  }

  private _userId: number;

  get userId() {
    return this._userId;
  }

  private _createdAt: Date;

  get createdAt() {
    return this._createdAt;
  }

  private _updatedAt: Date;

  get updatedAt() {
    return this._updatedAt;
  }
}
