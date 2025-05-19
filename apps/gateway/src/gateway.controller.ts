import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from '@app/common/decorators/roles.decorator';
import { UserRole } from '@app/common/dto/user-role.enum';

@Controller('gateway')
export class GatewayController {
  @Get('me')
  @Roles(UserRole.USER, UserRole.OPERATOR, UserRole.ADMIN)
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
