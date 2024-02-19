import { Module } from '@nestjs/common';
import { PrismaModule } from '@shtifh/prisma-service';
import { UserModule } from '@shtifh/user-service';
import { EmployeeResourceService } from './employee.service';
import { EmployeeResourceController } from './employee.controller';

@Module({
  imports: [PrismaModule, UserModule],
  providers: [EmployeeResourceService, EmployeeResourceController],
  exports: [EmployeeResourceService, EmployeeResourceController],
  controllers: [EmployeeResourceController],
})
export class EmployeeResourceModule {}
