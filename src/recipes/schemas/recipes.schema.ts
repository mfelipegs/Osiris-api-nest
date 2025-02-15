import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Recipe extends Document {
  @Prop({ required: true })
  nameRecipe: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  pancs: string[];

  @Prop({ required: true })
  ingredients: string[];

  @Prop({ required: true })
  preparation: string[];

  @Prop()
  image: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true })
  locale: string;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
