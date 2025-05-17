import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    console.log('✅ /auth/signup 요청 도달');
    await this.usersService.createUser(dto);
    return { message: '회원가입 성공' };
  }
}
