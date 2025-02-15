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

  create(
    namePanc: string,
    description: string,
    cultivation: string[],
    benefits: string,
    image: string,
    locale: string,
  ): Promise<Panc> {
    const newPanc = new this.pancModel({
      namePanc,
      description,
      cultivation,
      benefits,
      image,
      locale,
    });
    return newPanc.save();
  }

  findAll(): Promise<Panc[]> {
    return this.pancModel.find().exec();
  }

  async findOne(id: string): Promise<Panc | null> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`'${id}' is not a valid id`);
    }

    const panc = await this.pancModel.findById(id).exec();
    if (!panc) {
      throw new NotFoundException(`PANC ${id} not found`);
    }
    return panc;
  }

  async update(id: string, updatePancDto: any): Promise<Panc> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`'${id}' is not a valid id`);
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
