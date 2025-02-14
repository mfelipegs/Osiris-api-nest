import { Injectable } from '@nestjs/common';
import { CreatePancDto } from './dto/create-panc.dto';
import { UpdatePancDto } from './dto/update-panc.dto';

@Injectable()
export class PancsService {
  create(createPancDto: CreatePancDto) {
    return 'This action adds a new panc';
  }

  findAll() {
    return `This action returns all pancs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} panc`;
  }

  update(id: number, updatePancDto: UpdatePancDto) {
    return `This action updates a #${id} panc`;
  }

  remove(id: number) {
    return `This action removes a #${id} panc`;
  }
}
