import { Module } from '@nestjs/common';
import { PrismaModule } from '@shtifh/prisma-service';
import { UserModule } from '@shtifh/user-service';
import { PrivateServiceController } from './private-service.controller';
import { PrivateServiceService } from './private-service.service';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [PrivateServiceController],
  providers: [PrivateServiceController, PrivateServiceService],
  exports: [PrivateServiceController, PrivateServiceService],
})
export class PrivateServiceResourceModule {}
