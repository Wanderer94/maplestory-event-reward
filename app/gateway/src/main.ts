import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  //auth
  server.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://localhost:3001/auth',
      changeOrigin: true,
    }),
  );

  //event
  server.use(
    '/event',
    createProxyMiddleware({
      target: 'http://localhost:3002',
      changeOrigin: true,
    }),
  );

  await app.init();
  await app.listen(3000, () => {
    console.log('Gateway 작동중');
  });
}
bootstrap();
