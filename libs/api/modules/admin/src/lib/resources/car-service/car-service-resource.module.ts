import { Module } from '@nestjs/common';
import { PrismaModule } from '@shtifh/prisma-service';
import { CarServiceResourceController } from './car-service-resource.controller';
import { CarServiceResourceService } from './car-service-resource.service';

@Module({
  imports: [PrismaModule],
  controllers: [CarServiceResourceController],
  providers: [CarServiceResourceController, CarServiceResourceService],
  exports: [CarServiceResourceController, CarServiceResourceService],
})
export class CarServiceResourceModule {}
