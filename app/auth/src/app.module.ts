import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TestService } from './test/test.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongo:27017/auth'), UsersModule],
  controllers: [AppController],
  providers: [AppService, TestService],
})
export class AppModule {}
