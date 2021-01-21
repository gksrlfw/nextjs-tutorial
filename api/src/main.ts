import 'dotenv/config';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // For accessing through '/api' 
  app.setGlobalPrefix('api');

  // For must be exist properties
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true 
  }));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
