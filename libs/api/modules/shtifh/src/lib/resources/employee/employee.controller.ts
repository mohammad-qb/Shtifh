import { Controller, Get, Logger, Query, UseGuards } from '@nestjs/common';
import { EmployeeResourceService } from './employee.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser, JwtAuthGuard } from '@shtifh/auth-service';
import { Payload } from '@shtifh/user-service';

@ApiTags('Employee')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('employees')
export class EmployeeResourceController {
  private logger = new Logger(EmployeeResourceController.name);

  constructor(private readonly employeeService: EmployeeResourceService) {}

  @Get('orders')
  async orders(@GetUser() user: Payload, @Query('isDone') isDone: boolean) {
    console.log({ user });
    return await this.employeeService.orders(user.id, isDone);
  }

  @Get('private-orders')
  async privateOrders(
    @GetUser() user: Payload,
    @Query('isDone') isDone: boolean
  ) {
    console.log({ user });
    return await this.employeeService.privateOrders(user.id, isDone);
  }
}
