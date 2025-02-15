import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePancDto } from './dto/create-panc.dto';
import { UpdatePancDto } from './dto/update-panc.dto';
import { Model } from 'mongoose';
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

  findOne(id: string) {
    return this.pancModel.findById({ id });
  }

  update(id: number, updatePancDto: UpdatePancDto) {
    return `This action updates a #${id} panc`;
  }

  remove(id: number) {
    return `This action removes a #${id} panc`;
  }
}
