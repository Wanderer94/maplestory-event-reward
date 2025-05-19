import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class RewardRequest extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  eventId: string;

  @Prop({ required: true })
  status: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const RewardRequestSchema = SchemaFactory.createForClass(RewardRequest);
