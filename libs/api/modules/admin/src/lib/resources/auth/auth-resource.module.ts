import { Module } from '@nestjs/common';
import { PrismaModule } from '@shtifh/prisma-service';
import { AuthResourceService } from './auth-resource.service';
import { UserModule } from '@shtifh/user-service';
import { AuthResourceController } from './auth-resource.controller';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [AuthResourceController],
  providers: [AuthResourceService, AuthResourceController],
  exports: [AuthResourceModule, AuthResourceController],
})
export class AuthResourceModule {}
