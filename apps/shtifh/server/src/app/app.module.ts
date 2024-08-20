import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';

import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { EnvModule } from '@shtifh/env-service';
import { ScheduleModule } from '@nestjs/schedule';
import { ShtifhModule } from './modules/shtifh.module';

@Module({
  imports: [
    ShtifhModule,
    EnvModule.forRoot(process.env),
    ScheduleModule.forRoot(),
  ],
  providers: [
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
