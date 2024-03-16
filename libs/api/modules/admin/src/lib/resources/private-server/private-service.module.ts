import { Module } from '@nestjs/common';
import { PrivateServiceController } from './private-service.controller';
import { PrivateServiceService } from './private-service.service';

@Module({
  controllers: [PrivateServiceController],
  providers: [PrivateServiceController, PrivateServiceService],
})
export class PrivateServiceModule {}
