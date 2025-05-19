import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '@app/common/dto/create-user.dto';
import { LoginDto } from '@app/common/dto/login.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async register(dto: CreateUserDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const createdUser = new this.userModel({ ...dto, password: hashed });
    await createdUser.save();
    return { message: 'User created' };
  }

  async login(dto: LoginDto): Promise<string | null> {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user || !(await bcrypt.compare(dto.password, user.password)))
      return null;

    const payload = { sub: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }
}
