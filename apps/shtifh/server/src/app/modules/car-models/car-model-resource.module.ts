import { Module } from '@nestjs/common';
import { PrismaModule } from '@shtifh/prisma-service';
import { CarModelResourceController } from './car-model-resource.controller';
import { CarModelResourceService } from './car-model-resource.service';

@Module({
  imports: [PrismaModule],
  controllers: [CarModelResourceController],
  providers: [CarModelResourceController, CarModelResourceService],
  exports: [CarModelResourceController, CarModelResourceService],
})
export class CarModelResourceModule {}
