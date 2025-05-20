import { Module } from '@nestjs/common';
import { GatewayAuthController } from './auth.controller';
import { GatewayEventController } from './event.controller';
import { HttpModule } from '@nestjs/axios';
import { JwtStrategy } from '../../../libs/common/src/strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../../../libs/common/src/guards/jwt-auth.guard';
import { RolesGuard } from '../../../libs/common/src/guards/roles.guard';

@Module({
  imports: [HttpModule],
  controllers: [GatewayAuthController, GatewayEventController],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class GatewayModule {}
