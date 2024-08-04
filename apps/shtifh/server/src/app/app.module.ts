import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShtifhModule } from '@shtifh/shtifh-module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { EnvModule } from '@shtifh/env-service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ShtifhModule, EnvModule.forRoot(process.env), ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        forbidNonWhitelisted: true,
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
