import { Module } from '@nestjs/common';
import { AccessoriesResourceController } from './accessories.controller';
import { AccessoriesResourceService } from './accessories.service';

@Module({
  controllers: [AccessoriesResourceController],
  providers: [AccessoriesResourceController, AccessoriesResourceService],
  exports: [AccessoriesResourceController, AccessoriesResourceService],
})
export class AccessoriesResourceModule {}
