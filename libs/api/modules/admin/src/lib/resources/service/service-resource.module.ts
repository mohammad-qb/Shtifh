import { Module } from '@nestjs/common';
import { PrismaModule } from '@shtifh/prisma-service';
import { UserModule } from '@shtifh/user-service';
import { ServiceResourceController } from './service-resource.controller';
import { ServiceResourceService } from './service-resource.service';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [ServiceResourceController],
  providers: [ServiceResourceController, ServiceResourceService],
  exports: [ServiceResourceController, ServiceResourceService],
})
export class ServiceResourceModule {}
