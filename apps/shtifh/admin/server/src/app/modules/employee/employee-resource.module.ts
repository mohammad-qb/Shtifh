import { Module } from '@nestjs/common';
import { PrismaModule } from '@shtifh/prisma-service';
import { UserModule } from '@shtifh/user-service';
import { EmployeeResourceController } from './employee-resource.controller';
import { EmployeeResourceService } from './employee-resource.service';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [EmployeeResourceController],
  providers: [EmployeeResourceController, EmployeeResourceService],
  exports: [EmployeeResourceController, EmployeeResourceService],
})
export class EmployeeResourceModule {}
