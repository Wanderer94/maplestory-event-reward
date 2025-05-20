import { Controller, Post, Get, Param, Body, Req } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { Request } from 'express';
import { Roles } from '@app/common/decorators/roles.decorator';
import { UserRole } from '@app/common/dto/user-role.enum';
import { CreateRewardDto } from '../../../libs/common/src/dto/create-reward.dto';
import { CreateUserDto } from '../../../libs/common/src/dto/create-user.dto';

@Controller('event')
export class GatewayEventController {
  constructor(private readonly http: HttpService) {}

  @Post()
  @Roles(UserRole.OPERATOR, UserRole.ADMIN)
  createEvent(@Body() dto: CreateUserDto, @Req() req: Request) {
    console.log('dto: ', dto);
    console.log('req: ', req);

    return this.http
      .post('http://event:3001/event', dto, {
        headers: { Authorization: req.headers['authorization'] },
      })
      .pipe(map((res) => res.data));
  }

  @Get()
  @Roles(UserRole.USER, UserRole.OPERATOR, UserRole.ADMIN)
  getAllEvents(@Req() req: Request) {
    return this.http
      .get('http://event:3001/event', {
        headers: { Authorization: req.headers['authorization'] },
      })
      .pipe(map((res) => res.data));
  }

  @Post(':eventId/rewards')
  @Roles(UserRole.OPERATOR, UserRole.ADMIN)
  addReward(
    @Param('eventId') id: string,
    @Body() dto: CreateRewardDto,
    @Req() req: Request,
  ) {
    return this.http
      .post(`http://event:3001/event/${id}/rewards`, dto, {
        headers: { Authorization: req.headers['authorization'] },
      })
      .pipe(map((res) => res.data));
  }

  @Post(':eventId/rewards/request')
  @Roles(UserRole.USER)
  requestReward(@Param('eventId') id: string, @Req() req: Request) {
    return this.http
      .post(
        `http://event:3001/event/${id}/rewards/request`,
        {},
        {
          headers: { Authorization: req.headers['authorization'] },
        },
      )
      .pipe(map((res) => res.data));
  }
}
