import { Module } from '@nestjs/common';
import { PrismaModule } from '@shtifh/prisma-service';
import { EmployeeResourceService } from './employee.service';
import { EmployeeResourceController } from './employee.controller';

@Module({
  imports: [PrismaModule],
  providers: [EmployeeResourceService, EmployeeResourceController],
  exports: [EmployeeResourceService, EmployeeResourceController],
  controllers: [EmployeeResourceController],
})
export class EmployeeResourceModule {}
