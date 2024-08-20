import { Module } from '@nestjs/common';
import { PrismaModule } from '@shtifh/prisma-service';
import { CarModelServiceController } from './car-model-service.controller';
import { CarModelServiceService } from './car-model-service.service';

@Module({
  imports: [PrismaModule],
  controllers: [CarModelServiceController],
  providers: [CarModelServiceController, CarModelServiceService],
  exports: [CarModelServiceController, CarModelServiceService],
})
export class CarModelServiceModule {}
