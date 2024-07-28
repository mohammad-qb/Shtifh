import { Module } from '@nestjs/common';
import { PrismaModule } from '@shtifh/prisma-service';
import { AccessoriesResourceController } from './accessories.controller';
import { AccessoriesResourceService } from './accessories.service';

@Module({
  imports: [PrismaModule],
  controllers: [AccessoriesResourceController],
  providers: [AccessoriesResourceService, AccessoriesResourceController],
  exports: [AccessoriesResourceService, AccessoriesResourceController],
})
export class AccessoriesResourceModule {}
