import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config'
import { ValidationPipe } from '@nestjs/common';
import { useLogger } from './logger/useLogger';
import { ConfigProvider } from './app.config.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.setGlobalPrefix("api/afisha");
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useLogger(useLogger(ConfigProvider.useValue.logger))
  await app.listen(process.env.PORT);
}
bootstrap();
