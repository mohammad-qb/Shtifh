import { Module } from '@nestjs/common';
import { PrismaModule } from '@shtifh/prisma-service';
import { CarResourceController } from './car-resource.controller';
import { CarResourceService } from './car-resource.service';
import { UserModule } from '@shtifh/user-service';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [CarResourceController],
  providers: [CarResourceService, CarResourceController],
  exports: [CarResourceController, CarResourceService],
})
export class CarResourceModule {}
