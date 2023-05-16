import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilterRecipeDto } from '../dto/filter-recipe.dto';
import { CreateRecipeDto, UpdateRecipeDto } from '../dto/modify-recipe.dto';
import { Recipe, RecipeDocument } from '../entities/recipe.entity';

@Injectable()
export class RecipeRepository {
  constructor(
    @InjectModel(Recipe.name)
    private readonly recipeModel: Model<RecipeDocument>,
  ) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const createdEntity = new this.recipeModel(createRecipeDto);
    return await createdEntity.save();
  }

  async findAll(filterRecipeDto: FilterRecipeDto): Promise<Recipe[]> {
    return await this.recipeModel.find(filterRecipeDto).exec();
  }

  async findOne(id: string): Promise<Recipe> {
    return await this.recipeModel.findOne({ id }).exec();
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
    return await this.recipeModel
      .findOneAndUpdate({ id }, updateRecipeDto, { new: true })
      .exec();
  }

  async deleteOne(id: string): Promise<Recipe> {
    return await this.recipeModel.findOneAndDelete({ id }).exec();
  }

  async deleteAll(filterRecipeDto: FilterRecipeDto): Promise<any> {
    return await this.recipeModel.deleteMany(filterRecipeDto).exec();
  }
}
