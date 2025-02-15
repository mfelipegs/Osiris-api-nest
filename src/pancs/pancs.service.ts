import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePancDto } from './dto/create-panc.dto';
import { UpdatePancDto } from './dto/update-panc.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Panc } from './schemas/pancs.schema';

@Injectable()
export class PancsService {
  constructor(@InjectModel(Panc.name) private pancModel: Model<Panc>) {}

  async create(createPancDto: CreatePancDto): Promise<Panc> {
    const { namePanc } = createPancDto;

    const pancInDatabase = await this.pancModel.findOne({ namePanc }).exec();

    if (pancInDatabase) {
      throw new BadRequestException(`This PANC already exists.`);
    }

    const newPanc = new this.pancModel(createPancDto);
    return newPanc.save();
  }

  async list(page: number, itemsPerPage: number) {
    const totalItems = await this.pancModel.countDocuments().exec();
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const data = await this.pancModel
      .find()
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

  async findOne(id: string): Promise<Panc> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`'${id}' is not a valid id`);
    }

    const panc = await this.pancModel.findById(id).exec();
    if (!panc) {
      throw new NotFoundException(`PANC ${id} not found`);
    }
    return panc;
  }

  async update(id: string, updatePancDto: UpdatePancDto): Promise<Panc> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`'${id}' is not a valid id`);
    }

    const { namePanc } = updatePancDto;

    const pancInDatabase = await this.pancModel.findOne({ namePanc }).exec();

    if (pancInDatabase) {
      throw new BadRequestException(`This PANC already exists.`);
    }

    const updatedPanc = await this.pancModel
      .findByIdAndUpdate(id, updatePancDto, { new: true })
      .exec();

    if (!updatedPanc) {
      throw new NotFoundException(`PANC ${id} not found`);
    }

    return updatedPanc;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`'${id}' is not a valid id`);
    }

    const panc = await this.pancModel.findByIdAndDelete(id).exec();
    if (!panc) {
      throw new NotFoundException(`PANC ${id} not found`);
    }
  }
}
