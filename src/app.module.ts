import { Module } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { QuizModule } from './quiz/quiz.module';
import { Connection } from 'typeorm';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { APP_FILTER } from '@nestjs/core';
import ExceptionsLoggerFilter from './utils/exceptionsLogger.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    QuizModule,
    UserModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
