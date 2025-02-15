import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Panc extends Document {
  @Prop({ required: true, unique: true })
  namePanc: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  cultivation: string[];

  @Prop({ required: true })
  benefits: string;

  @Prop()
  image: string;

  @Prop({ required: true })
  locale: string;
}

export const PancSchema = SchemaFactory.createForClass(Panc);
