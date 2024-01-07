import { Module } from '@nestjs/common';
import { PrismaModule } from '@shtifh/prisma-service';
import { AuthShtifhService } from './auth.service';
import { AuthShtifhController } from './auth.controller';
import { UserModule } from '@shtifh/user-service';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [AuthShtifhController],
  providers: [AuthShtifhService, AuthShtifhController],
  exports: [AuthShtifhService, AuthShtifhController],
})
export class AuthShtifhModule {}
