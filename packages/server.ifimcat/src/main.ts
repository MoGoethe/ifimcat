import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import helmet from 'helmet';

async function main() {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors(config.cors);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(config.port);
}
main();