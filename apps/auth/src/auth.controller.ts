import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@app/common/dto/create-user.dto';
import { LoginDto } from '@app/common/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const token = await this.authService.login(dto);
    if (!token) throw new UnauthorizedException('Invalid credentials');
    return { accessToken: token };
  }
}
