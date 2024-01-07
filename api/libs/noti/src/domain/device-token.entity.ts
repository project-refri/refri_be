export class DeviceToken {
  constructor(props: {
    id: number;
    userId: number;
    fcmDeviceToken: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this._id = props.id;
    this._userId = props.userId;
    this._fcmDeviceToken = props.fcmDeviceToken;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  private _id: number;

  get id(): number {
    return this._id;
  }

  private _userId: number;

  get userId(): number {
    return this._userId;
  }

  private _fcmDeviceToken: string;

  get fcmDeviceToken(): string {
    return this._fcmDeviceToken;
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
