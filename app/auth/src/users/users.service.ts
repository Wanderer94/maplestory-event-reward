import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
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
}
