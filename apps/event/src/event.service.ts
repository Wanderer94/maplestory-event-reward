import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './schemas/event.schema';
import { Reward } from './schemas/reward.schema';
import { RewardRequest } from './schemas/reward-request.schema';
import { CreateEventDto } from '../../../libs/common/src/dto/create-event.dto';
import { CreateRewardDto } from '../../../libs/common/src/dto/create-reward.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @InjectModel(Reward.name) private rewardModel: Model<Reward>,
    @InjectModel(RewardRequest.name) private requestModel: Model<RewardRequest>,
  ) {}

  async create(dto: CreateEventDto) {
    const event = new this.eventModel(dto);
    return event.save();
  }

  async findAll() {
    return this.eventModel.find();
  }

  async findOne(id: string) {
    const event = await this.eventModel.findById(id);
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async update(id: string, dto: CreateEventDto) {
    const updated = await this.eventModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Event not found');
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.eventModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Event not found');
    await this.rewardModel.deleteMany({ eventId: id });
    await this.requestModel.deleteMany({ eventId: id });
    return { message: 'Deleted' };
  }

  async addReward(eventId: string, dto: CreateRewardDto) {
    const event = await this.eventModel.findById(eventId);
    if (!event) throw new NotFoundException('Event not found');
    const reward = new this.rewardModel({ ...dto, eventId });
    return reward.save();
  }

  async getRewards(eventId: string) {
    return this.rewardModel.find({ eventId });
  }

  async requestReward(eventId: string, userId: string) {
    const event = await this.eventModel.findById(eventId);
    if (!event) throw new NotFoundException('Event not found');

    const existing = await this.requestModel.findOne({ eventId, userId });
    if (existing) throw new ConflictException('Reward already requested');

    const conditionMet = true; // 실제 로직 필요
    const status = conditionMet ? 'SUCCESS' : 'FAILED';
    const record = new this.requestModel({ eventId, userId, status });
    return record.save();
  }

  async getRequests(eventId: string) {
    return this.requestModel.find({ eventId });
  }
}
