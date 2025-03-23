import { Injectable } from '@nestjs/common';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { Prediction } from './schemas/prediction.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PredictionService {
  constructor(
    @InjectModel(Prediction.name) private predictionModel: Model<Prediction>,
  ) {}

  create(createPredictionDto: CreatePredictionDto): Promise<Prediction> {
    const createdPrediction = new this.predictionModel(createPredictionDto);
    return createdPrediction.save();
  }

  findAll(): Promise<Prediction[]> {
    return this.predictionModel.find().exec();
  }
}
