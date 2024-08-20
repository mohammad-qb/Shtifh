import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';

import { EnvModule } from '@shtifh/env-service';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AdminShtifhModule } from './modules/admin.module';

@Module({
  imports: [AdminShtifhModule, EnvModule.forRoot(process.env)],
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
