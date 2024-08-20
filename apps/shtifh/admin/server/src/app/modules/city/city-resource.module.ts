import { Module } from '@nestjs/common';
import { PrismaModule } from '@shtifh/prisma-service';
import { UserModule } from '@shtifh/user-service';
import { CityResourceController } from './city-resource.controller';
import { CityResourceService } from './city-resource.service';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [CityResourceController],
  providers: [CityResourceController, CityResourceService],
  exports: [CityResourceController, CityResourceService],
})
export class CityResourceModule {}
