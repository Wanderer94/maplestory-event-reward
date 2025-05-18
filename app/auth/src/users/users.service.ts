import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const { email, password } = dto;
    const existing = await this.userModel.findOne({ email });
    if (existing) {
      throw new Error('이미 등록된 이메일입니다');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = new this.userModel({
      email,
      password: hashedPassword,
      role: 'USER',
    });

    return createUser.save();
  }

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error('없는 이메일입니다');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('비밀번호가 틀렸습니다');
    }
    return user;
  }

  async login(user: UserDocument): Promise<{ access_token: string }> {
    const payload = { sub: user._id, email: user.email, role: user.role };
    console.log('🧪 [1] Signing payload:', payload);
    console.log('🧪 [2] jwtService:', this.jwtService);
    console.log('🧪 [3] jwtService.options:', (this.jwtService as any).options);
    console.log('🧪 [4] typeof jwtService.sign:', typeof this.jwtService.sign);
    console.log('🧪 [5] jwtService.sign exists:', !!this.jwtService.sign);
    console.log('🧪 [6] JWT_SECRET from env:', process.env.JWT_SECRET);
    console.log(
      '🧪 [7] jwtService properties:',
      Object.getOwnPropertyNames(this.jwtService),
    );
    try {
      const token = this.jwtService.sign(payload);
      console.log('✅ [8] Token successfully generated:', token);
      return { access_token: token };
    } catch (e) {
      console.error('❌ [9] JWT Signing Error:', e);
      throw e;
    }
    // return { access_token: this.jwtService.sign(payload) };
  }
}
