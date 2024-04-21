import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: '*',
  });
  app.use(helmet());
  app.setGlobalPrefix('v1');
  await app.listen(process.env.PORT || 80);
}
bootstrap();
