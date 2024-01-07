import { Module } from '@nestjs/common';
import { PrismaModule } from '@shtifh/prisma-service';
import { CityResourceController } from './city-resource.controller';
import { CityResourceService } from './city-resource.service';

@Module({
  imports: [PrismaModule],
  controllers: [CityResourceController],
  providers: [CityResourceService, CityResourceController],
  exports: [CityResourceService, CityResourceController],
})
export class CityResourceModule {}
