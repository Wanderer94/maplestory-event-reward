import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class TestService {
  constructor(@InjectConnection() private readonly connection: Connection) {
    console.log('MongoDB 연결 상태: ', this.connection.readyState);
  }
}
