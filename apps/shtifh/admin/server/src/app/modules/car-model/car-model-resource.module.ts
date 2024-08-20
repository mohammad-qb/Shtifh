import { Module } from '@nestjs/common';
import { PrismaModule } from '@shtifh/prisma-service';
import { UserModule } from '@shtifh/user-service';
import { CarModelResourceController } from './car-model-resource.controller';
import { CarModelResourceService } from './car-model-resource.service';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [CarModelResourceController],
  providers: [CarModelResourceController, CarModelResourceService],
  exports: [CarModelResourceController, CarModelResourceService],
})
export class CarModelResourceModule {}
