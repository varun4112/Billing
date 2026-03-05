import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`=================> Reading env from ${process.env.ENV_FILE} <=================`);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
