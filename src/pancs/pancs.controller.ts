import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PancsService } from './pancs.service';
import { CreatePancDto } from './dto/create-panc.dto';
import { UpdatePancDto } from './dto/update-panc.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('pancs')
export class PancsController {
  constructor(private readonly pancsService: PancsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createPancDto: CreatePancDto) {
    return this.pancsService.create(createPancDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(
    @Query('page') page = 1,
    @Query('itemsPerPage') itemsPerPage = 5,
  ) {
    const result = await this.pancsService.list(
      Number(page),
      Number(itemsPerPage),
    );
    return result;
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.pancsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updatePancDto: UpdatePancDto) {
    return this.pancsService.update(id, updatePancDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.pancsService.remove(id);
  }
}
