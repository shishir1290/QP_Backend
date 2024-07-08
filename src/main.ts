import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  dotenv.config(); // Load .env file
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: process.env.NODE_ENV === 'production' ? 'https://haque-vila.vercel.app' : 'http://localhost:3500', // Adjust the origin based on your frontend URL
  });

  await app.listen(process.env.PORT || 4000);
}

bootstrap().catch(err => console.error(err));
