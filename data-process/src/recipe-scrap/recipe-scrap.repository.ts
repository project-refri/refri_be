import { Injectable } from '@nestjs/common';
import {
  RecipeScrapRequest,
  RecipeScrapRequestStatus,
} from './entity/recipe-scrap-req.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRecipeScrapRequestDto } from './dto/modify-recipe-scrap-req.dto';

@Injectable()
export class RecipeScrapRepository {
  constructor(
    @InjectModel(RecipeScrapRequest.name)
    private readonly recipeScrapReqModel: Model<RecipeScrapRequest>,
  ) {}

  async createRecipeScrapRequest(
    createRecipeScrapRequestDto: CreateRecipeScrapRequestDto,
  ) {
    const recipeScrapReq = new this.recipeScrapReqModel(
      createRecipeScrapRequestDto,
    );
    return await recipeScrapReq.save();
  }

  async findOneByUrl(url: string) {
    return await this.recipeScrapReqModel.findOne({ url }).exec();
  }

  async findAll() {
    return await this.recipeScrapReqModel.find().exec();
  }

  async findAllRecipeScrapRequestOrderByRecent() {
    return await this.recipeScrapReqModel
      .find({ status: RecipeScrapRequestStatus.PENDING })
      .sort({ createdAt: -1 })
      .exec();
  }

  async updateRecipeScrapRequestStatusToDone(id: string) {
    return await this.recipeScrapReqModel
      .findOneAndUpdate(
        { id },
        { status: RecipeScrapRequestStatus.DONE },
        { new: true },
      )
      .exec();
  }

  async updateRecipeScrapRequestStatusToError(id: string) {
    return await this.recipeScrapReqModel
      .findOneAndUpdate(
        { id },
        { status: RecipeScrapRequestStatus.ERROR },
        { new: true },
      )
      .exec();
  }

  async deleteOne(id: string) {
    return await this.recipeScrapReqModel.deleteOne({ id }).exec();
  }

  async deleteAll(filterDto: { status: RecipeScrapRequestStatus }) {
    return await this.recipeScrapReqModel.deleteMany(filterDto).exec();
  }
}
