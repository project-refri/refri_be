export class Ingredient {
  constructor(props: {
    id: number;
    name: string;
    description: string;
    thumbnail: string;
    icon: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this._id = props.id;
    this._name = props.name;
    this._description = props.description;
    this._thumbnail = props.thumbnail;
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

  private _description: string;

  get description(): string {
    return this._description;
  }

  private _thumbnail: string;

  get thumbnail(): string {
    return this._thumbnail;
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
