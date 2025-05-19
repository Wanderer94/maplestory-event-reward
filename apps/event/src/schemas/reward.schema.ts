import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Reward extends Document {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  amount: number;

  @Prop()
  description?: string;

  @Prop({ required: true })
  eventId: string;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
