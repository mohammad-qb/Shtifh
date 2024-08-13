import { Module } from '@nestjs/common';
import { PrismaModule } from '@shtifh/prisma-service';
import { AuthResourceService } from './auth-resource.service';
import { AuthResourceController } from './auth-resource.controller';
import { UserModule } from '@shtifh/user-service';
import { FcmModule } from '@shtifh/fcm-service';

@Module({
  imports: [PrismaModule, UserModule, FcmModule],
  controllers: [AuthResourceController],
  providers: [AuthResourceService, AuthResourceController],
  exports: [AuthResourceService, AuthResourceController],
})
export class AuthResourceModule {}
