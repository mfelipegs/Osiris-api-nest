import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { PancsService } from './pancs.service';
import { CreatePancDto } from './dto/create-panc.dto';
import { UpdatePancDto } from './dto/update-panc.dto';

@Controller('pancs')
export class PancsController {
  constructor(private readonly pancsService: PancsService) {}

  @Post()
  create(
    @Body()
    body: {
      namePanc: string;
      description: string;
      cultivation: string[];
      benefits: string;
      image: string;
      locale: string;
    },
  ) {
    return this.pancsService.create(
      body.namePanc,
      body.description,
      body.cultivation,
      body.benefits,
      body.image,
      body.locale,
    );
  }

  @Get()
  findAll() {
    return this.pancsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pancsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePancDto: UpdatePancDto) {
    return this.pancsService.update(id, updatePancDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.pancsService.remove(id);
  }
}
