import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { Event, EventSchema } from './schemas/event.schema';
import { Reward, RewardSchema } from './schemas/reward.schema';
import {
  RewardRequest,
  RewardRequestSchema,
} from './schemas/reward-request.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/event-db'),
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: Reward.name, schema: RewardSchema },
      { name: RewardRequest.name, schema: RewardRequestSchema },
    ]),
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
