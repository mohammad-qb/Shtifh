import { Module } from '@nestjs/common';
import { PrismaModule } from '@shtifh/prisma-service';
import { AuthResourceService } from './auth-resource.service';
import { AuthResourceController } from './auth-resource.controller';
import { FcmModule } from '@shtifh/fcm-service';

@Module({
  imports: [PrismaModule, FcmModule],
  controllers: [AuthResourceController],
  providers: [AuthResourceService, AuthResourceController],
  exports: [AuthResourceService, AuthResourceController],
})
export class AuthResourceModule {}
