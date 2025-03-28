import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './schemas/recipes.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';

@Injectable()
export class RecipesService {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>) {}

  create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const newRecipe = new this.recipeModel(createRecipeDto);

    return newRecipe.save();
  }

  async list(page: number, itemsPerPage: number) {
    const totalItems = await this.recipeModel.countDocuments().exec();
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const data = await this.recipeModel
      .find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);

    return {
      data,
      page,
      itemsPerPage,
      totalItems,
      totalPages,
    };
  }

  async findOne(id: string): Promise<Recipe> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`'${id}' is not a valid id`);
    }

    const recipe = await this.recipeModel.findById(id).exec();
    if (!recipe) {
      throw new NotFoundException(`Recipe ${id} not found`);
    }
    return recipe;
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`'${id}' is not a valid id`);
    }

    const updatedRecipe = await this.recipeModel
      .findByIdAndUpdate(id, updateRecipeDto, { new: true })
      .exec();

    if (!updatedRecipe) {
      throw new NotFoundException(`Recipe ${id} not found`);
    }

    return updatedRecipe;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`'${id}' is not a valid id`);
    }

    const recipe = await this.recipeModel.findByIdAndDelete(id).exec();
    if (!recipe) {
      throw new NotFoundException(`Recipe ${id} not found`);
    }
    return recipe;
  }
}
