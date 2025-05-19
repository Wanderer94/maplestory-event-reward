import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '@app/common/dto/create-user.dto';
import { LoginDto } from '@app/common/dto/login.dto';
import { UserRole } from '@app/common/dto/user-role.enum';

@Injectable()
export class AuthService {
  private users = new Map(); // MongoDB로 대체 예정

  constructor(private jwtService: JwtService) {}

  async register(dto: CreateUserDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    this.users.set(dto.email, { ...dto, password: hashed });
    return { message: 'User created' };
  }

  async login(dto: LoginDto): Promise<string | null> {
    const user = this.users.get(dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.password)))
      return null;

    const payload = { sub: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }
}
