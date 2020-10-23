import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ExcludeNullInterceptor } from './utils/interceptors/excludeNull.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // validate incoming data
  app.useGlobalInterceptors(new ExcludeNullInterceptor()); // strip null values from returned data
  app.use(cookieParser());

  // init swagger
  const options = new DocumentBuilder()
    .setTitle('Celebrity Quiz')
    .setDescription('API for creating users and quizzes')
    .setVersion('1.0')
    .addTag('quiz')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
