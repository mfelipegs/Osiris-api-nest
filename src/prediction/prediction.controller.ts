import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PredictionService } from './prediction.service';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'nestjs-cloudinary';

@Controller('prediction')
export class PredictionController {
  constructor(
    private readonly predictionService: PredictionService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createPredictionDto: CreatePredictionDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const uploadedImage = await this.cloudinaryService.uploadFile(file);

    createPredictionDto.image = uploadedImage.url;

    return this.predictionService.create(createPredictionDto);
  }

  @Get()
  findAll() {
    return this.predictionService.findAll();
  }
}
