import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Prediction extends Document {
  @Prop({ type: String, required: false })
  image?: string;

  @Prop({ type: Date, default: () => new Date() })
  date: Date;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
}

export const PredictionSchema = SchemaFactory.createForClass(Prediction);
