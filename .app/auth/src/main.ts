import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const port = 3001; // ⚠️ Gateway는 3000, Auth는 3001

  await app.listen(port);
  console.log(`✅ Auth service running on http://localhost:${port}`);
}
bootstrap();
