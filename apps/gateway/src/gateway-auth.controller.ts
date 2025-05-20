import { Controller, Post, Body } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateUserDto } from '../../../libs/common/src/dto/create-user.dto';
import { LoginDto } from '../../../libs/common/src/dto/login.dto';
import { map } from 'rxjs/operators';
import { Public } from '../../../libs/common/src/decorators/public.decorator';

@Controller('auth')
export class GatewayAuthController {
  constructor(private readonly http: HttpService) {}

  @Post('signup')
  @Public()
  signup(@Body() dto: CreateUserDto) {
    return this.http
      .post('http://auth:3002/auth/signup', dto)
      .pipe(map((res) => res.data));
  }

  @Post('login')
  @Public()
  login(@Body() dto: LoginDto) {
    return this.http
      .post('http://auth:3002/auth/login', dto)
      .pipe(map((res) => res.data));
  }
}
