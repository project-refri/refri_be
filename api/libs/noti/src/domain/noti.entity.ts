export class Noti {
  constructor(props: {
    id: number;
    userId: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this._id = props.id;
    this._userId = props.userId;
    this._content = props.content;
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

  private _content: string;

  get content(): string {
    return this._content;
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
