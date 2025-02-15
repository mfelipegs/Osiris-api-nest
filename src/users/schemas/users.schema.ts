import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
class Subscription {
  @Prop({ required: true, default: false })
  active: boolean;

  @Prop({ type: String })
  startDate?: string;

  @Prop({ type: String })
  endDate?: string;
}

@Schema()
export class User extends Document {
  @Prop({ required: true })
  nameUser: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: [] })
  favoritePancsIds: string[];

  @Prop({ required: true, default: [] })
  favoriteRecipesIds: string[];

  @Prop({ type: Subscription, default: {} }) // Subdocumento com default
  subscription: Subscription;

  @Prop()
  image: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
