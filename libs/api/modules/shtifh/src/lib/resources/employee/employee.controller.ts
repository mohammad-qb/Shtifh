import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EmployeeResourceService } from './employee.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser, JwtAuthGuard } from '@shtifh/auth-service';
import { Payload } from '@shtifh/user-service';
import { UpcomingDto } from './dto/upcoming.dto';

@ApiTags('Employee')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('employees')
export class EmployeeResourceController {
  private logger = new Logger(EmployeeResourceController.name);

  constructor(private readonly employeeService: EmployeeResourceService) {}

  @Get('orders')
  async orders(@GetUser() user: Payload, @Query('isDone') isDone: string) {
    console.log({ user });
    return await this.employeeService.orders(user.id, isDone === 'true');
  }

  @Get('private-orders')
  async privateOrders(
    @GetUser() user: Payload,
    @Query('isDone') isDone: string
  ) {
    console.log({ user });
    return await this.employeeService.privateOrders(user.id, isDone === 'true');
  }

  @Get('statistics')
  async statistics(@GetUser() user: Payload) {
    return await this.employeeService.statistics(user.id);
  }

  @Get('wallet')
  async getWallet(@GetUser() user: Payload) {
    return this.employeeService.wallet(user.id);
  }

  @Post('upcoming-orders')
  async upcomingOrders(@GetUser() user: Payload, @Body() body: UpcomingDto) {
    return await this.employeeService.UpcomingOrders(user.id, body.date);
  }

  @Post('upcoming-private-orders')
  async upcomingPrivateOrders(
    @GetUser() user: Payload,
    @Body() body: UpcomingDto
  ) {
    return await this.employeeService.UpcomingPrivateOrders(user.id, body.date);
  }
}
