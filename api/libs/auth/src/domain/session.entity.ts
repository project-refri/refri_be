import { User } from '@app/user/domain/user.entity';

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
