import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { CreateRewardDto } from './dto/create-reward.dto';
import { Roles } from '@app/common/decorators/roles.decorator';
import { UserRole } from '@app/common/dto/user-role.enum';
import { RolesGuard } from '@app/common/guards/roles.guard';

@Controller('events')
@UseGuards(RolesGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @Roles(UserRole.OPERATOR, UserRole.ADMIN)
  create(@Body() dto: CreateEventDto) {
    return this.eventService.create(dto);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Put(':id')
  @Roles(UserRole.OPERATOR, UserRole.ADMIN)
  update(@Param('id') id: string, @Body() dto: CreateEventDto) {
    return this.eventService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.OPERATOR, UserRole.ADMIN)
  delete(@Param('id') id: string) {
    return this.eventService.delete(id);
  }

  @Post(':id/rewards')
  @Roles(UserRole.OPERATOR, UserRole.ADMIN)
  addReward(@Param('id') eventId: string, @Body() dto: CreateRewardDto) {
    return this.eventService.addReward(eventId, dto);
  }

  @Get(':id/rewards')
  getRewards(@Param('id') eventId: string) {
    return this.eventService.getRewards(eventId);
  }

  @Post(':id/request')
  @Roles(UserRole.USER)
  requestReward(@Param('id') eventId: string, @Body('userId') userId: string) {
    return this.eventService.requestReward(eventId, userId);
  }

  @Get(':id/requests')
  @Roles(UserRole.OPERATOR, UserRole.AUDITOR, UserRole.ADMIN)
  getRequests(@Param('id') eventId: string) {
    return this.eventService.getRequests(eventId);
  }
}
