import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '@app/common/guards/roles.guard';
import { GatewayController } from './gateway.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
    }),
  ],
  controllers: [GatewayController],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard('jwt') },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class GatewayModule {}
