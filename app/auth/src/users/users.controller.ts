import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    await this.usersService.createUser(dto);
    return { message: '회원가입 성공' };
  }
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.usersService.validateUser(dto.email, dto.password);
    if (!user) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 올바르지 않습니다',
      );
    }
    return this.usersService.login(user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req) {
    return { message: '내 정보입니다', user: req.user };
  }
}
