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
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PredictionStatus } from './enums/prediction-status';

interface AIPredictionResponse {
  classe: string;
  acuracia: number;
}

@Controller('prediction')
export class PredictionController {
  constructor(
    private readonly predictionService: PredictionService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly httpService: HttpService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createPredictionDto: CreatePredictionDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const uploadedImage = await this.cloudinaryService.uploadFile(file);

      createPredictionDto.image = uploadedImage.url;

      const aiResponse = await firstValueFrom(
        this.httpService.post<AIPredictionResponse>(
          'http://localhost:5000/predict',
          {
            imagem: uploadedImage.url,
          },
        ),
      );

      if (aiResponse.status === 200 && aiResponse.data) {
        createPredictionDto.status = PredictionStatus.PROCESSED;
        createPredictionDto.class = aiResponse.data.classe;
        createPredictionDto.accuracy = aiResponse.data.acuracia;
      } else {
        createPredictionDto.status = PredictionStatus.FAILED;
      }
    } catch (error) {
      console.error('Error on requesting the IA API:', error);
      createPredictionDto.status = PredictionStatus.FAILED;
    }

    return this.predictionService.create(createPredictionDto);
  }

  @Get()
  findAll() {
    return this.predictionService.findAll();
  }
}
