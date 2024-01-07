import { OmitType } from '@nestjs/swagger';
import { RecipeDto } from '@app/recipe/dto/recipe/recipe.dto';

export class RecipesItemDto extends OmitType(RecipeDto, [
  'mongoId',
  'ownerId',
  'owner',
  'originUrl',
]) {
  constructor(
    public readonly id: number = null,
    public readonly name: string = null,
    public readonly thumbnail: string = null,
    public readonly description: string = null,
    public readonly viewCount: number = null,
    public readonly createdAt: Date = null,
    public readonly updatedAt: Date = null,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.thumbnail = thumbnail;
    this.description = description;
    this.viewCount = viewCount;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
