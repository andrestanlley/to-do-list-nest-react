import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { FRONT_URL, PORT } = process.env;

  app.setGlobalPrefix('api/v1');
  app.use(morgan('combined'));
  app.enableCors({
    origin: [FRONT_URL, 'http://spa:8080', 'http://localhost:8080'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(PORT ?? 3000);
}
bootstrap();
